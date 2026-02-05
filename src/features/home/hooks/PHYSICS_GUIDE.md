# 🎯 Hướng dẫn Physics System với Matter.js + React

## 📚 Mục lục

1. [Tổng quan hệ thống](#tổng-quan-hệ-thống)
2. [Kiến trúc và luồng dữ liệu](#kiến-trúc-và-luồng-dữ-liệu)
3. [Chi tiết Hook useMatterPhysics](#chi-tiết-hook-usematterphysics)
4. [Giải thích các khái niệm Matter.js](#giải-thích-các-khái-niệm-matterjs)
5. [Cơ chế đồng bộ Physics ↔ DOM](#cơ-chế-đồng-bộ-physics--dom)
6. [Tại sao dùng useRef thay vì useState](#tại-sao-dùng-useref-thay-vì-usestate)
7. [Troubleshooting](#troubleshooting)

---

## 🎬 Tổng quan hệ thống

### Hệ thống này làm gì?

Tạo một **physics simulation** (mô phỏng vật lý) cho các elements trên web:

- Buttons và photos **rơi từ trên xuống** như thật
- **Va chạm** với nhau và với tường
- **Kéo thả** bằng chuột
- **Xoay** khi rơi và va chạm

### Công nghệ sử dụng:

- **Matter.js**: Physics engine (động cơ vật lý)
- **React**: UI framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling

---

## 🏗️ Kiến trúc và luồng dữ liệu

```
┌─────────────────────────────────────────────────────────────┐
│                      HeroSection.tsx                         │
│  - Định nghĩa items data (buttons, photos)                  │
│  - Render DOM elements                                       │
│  - Pass refs vào hook                                        │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                  useMatterPhysics Hook                       │
│  1. Đọc size từ DOM elements                                │
│  2. Tạo physics bodies (vật thể vật lý)                     │
│  3. Tạo physics world (thế giới vật lý)                     │
│  4. Chạy simulation loop                                     │
│  5. Update DOM positions mỗi frame                          │
└────────────────┬────────────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      Matter.js Engine                        │
│  - Tính toán vật lý (gravity, collision, friction)          │
│  - Update positions, rotations, velocities                   │
│  - 60 FPS simulation                                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 Chi tiết Hook useMatterPhysics

### 📥 Input Parameters

```typescript
useMatterPhysics(
  containerRef, // Ref đến div container
  canvasRef, // Ref đến canvas (debug view)
  items, // Array of items data
);
```

### 📤 Output

```typescript
{
  itemRefs;
} // Map để component bind refs vào elements
```

---

## 🎨 Giải thích các khái niệm Matter.js

### 1. **Engine** - Động cơ vật lý

```typescript
const engine = Engine.create({
  gravity: { x: 0, y: 1, scale: 0.001 },
});
```

**Là gì?**

- "Bộ não" của physics system
- Chứa tất cả bodies, constraints, và tính toán vật lý

**Làm gì?**

- Tính toán gravity (trọng lực)
- Xử lý collisions (va chạm)
- Update positions mỗi frame

**Tại sao cần?**

- Không có engine = không có physics!

---

### 2. **Body** - Vật thể vật lý

```typescript
const body = Bodies.rectangle(x, y, width, height, {
  restitution: 0.5, // Độ nảy (0-1)
  friction: 0.1, // Độ ma sát
  density: 0.001, // Khối lượng
});
```

**Là gì?**

- Đại diện cho 1 vật thể trong thế giới vật lý
- Có position, velocity, angle, mass

**Làm gì?**

- Rơi xuống do gravity
- Va chạm với bodies khác
- Phản ứng với forces (lực)

**Quan trọng:**

- 1 DOM element = 1 physics body
- Body có position → DOM element có position

---

### 3. **Composite** - Nhóm vật thể

```typescript
Composite.add(engine.world, [body1, body2, walls]);
```

**Là gì?**

- Container chứa nhiều bodies
- `engine.world` là composite chính

**Làm gì?**

- Quản lý tất cả bodies trong scene
- Add/remove bodies

---

### 4. **Runner** - Vòng lặp simulation

```typescript
const runner = Runner.create();
Runner.run(runner, engine);
```

**Là gì?**

- Game loop của physics engine
- Chạy 60 FPS (60 lần/giây)

**Làm gì?**

- Gọi `Engine.update()` mỗi frame
- Tính toán physics liên tục

**Tại sao cần?**

- Không có runner = bodies không di chuyển!

---

### 5. **Render** - Vẽ debug view

```typescript
const render = Render.create({
  canvas: canvasRef.current,
  engine: engine,
  options: { wireframes: false },
});
Render.run(render);
```

**Là gì?**

- Vẽ physics bodies lên canvas
- Chỉ để debug, không bắt buộc

**Làm gì?**

- Hiển thị hình dạng bodies
- Giúp debug collisions

**Lưu ý:**

- Có thể tắt bằng `opacity-0`
- Production thường tắt

---

### 6. **MouseConstraint** - Kéo thả chuột

```typescript
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: { stiffness: 0.2 },
});
```

**Là gì?**

- Cho phép kéo thả bodies bằng chuột

**Làm gì?**

- Detect mouse click trên body
- Tạo "dây" nối chuột với body
- Kéo body theo chuột

**Events:**

- `startdrag`: Bắt đầu kéo
- `enddrag`: Thả ra

---

## 🔄 Cơ chế đồng bộ Physics ↔ DOM

### Vấn đề cần giải quyết:

Matter.js tính toán physics trong "thế giới ảo", nhưng user nhìn thấy DOM elements. Làm sao đồng bộ?

### Giải pháp: 2 loops song song

#### **Loop 1: Physics Loop (Matter.js Runner)**

```typescript
Runner.run(runner, engine);
// Chạy 60 FPS, tự động
// Update: body.position, body.angle, body.velocity
```

**Làm gì?**

- Tính toán vật lý
- Update positions trong "thế giới ảo"

---

#### **Loop 2: DOM Update Loop (requestAnimationFrame)**

```typescript
const update = () => {
  items.forEach((item) => {
    const body = bodiesMap.current.get(item.id);
    const domEl = itemRefs.current.get(item.id);

    // Đọc position từ physics body
    const { x, y } = body.position;
    const angle = body.angle;

    // Apply vào DOM element
    domEl.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}rad)`;
  });

  requestAnimationFrame(update); // Loop tiếp
};
```

**Làm gì?**

1. Đọc position từ physics body
2. Apply vào DOM element qua CSS transform
3. Lặp lại mỗi frame (60 FPS)

**Tại sao dùng transform?**

- GPU accelerated (nhanh)
- Không trigger reflow (performance)
- Smooth animations

---

### Sơ đồ đồng bộ:

```
Frame 1:
  Physics: body.position = {x: 100, y: 50}
  DOM:     element.style.transform = "translate3d(100px, 50px, 0)"

Frame 2:
  Physics: body.position = {x: 100, y: 52} (rơi xuống)
  DOM:     element.style.transform = "translate3d(100px, 52px, 0)"

Frame 3:
  Physics: body.position = {x: 100, y: 55}
  DOM:     element.style.transform = "translate3d(100px, 55px, 0)"

... (60 lần/giây)
```

---

## 🎯 Tại sao dùng useRef thay vì useState?

### ❌ Nếu dùng useState:

```typescript
const [bodies, setBodies] = useState(new Map());

// Mỗi lần update
setBodies(newBodies); // → Trigger re-render
// → Component re-render
// → 60 FPS = 60 re-renders/giây
// → LAG NẶNG! 🔥
```

### ✅ Dùng useRef:

```typescript
const bodiesMap = useRef(new Map());

// Update
bodiesMap.current.set(id, body); // → KHÔNG trigger re-render
// → Component không re-render
// → Smooth 60 FPS ✨
```

### Quy tắc:

- **useState**: Khi cần re-render UI
- **useRef**: Khi cần persist data KHÔNG cần re-render

---

## 📊 Các Refs trong Hook

### 1. `itemRefs` - Map<id, HTMLElement>

```typescript
const itemRefs = useRef<Map<string | number, HTMLElement>>(new Map());
```

**Mục đích:**

- Lưu references đến DOM elements
- Component pass refs vào: `ref={(el) => itemRefs.current.set(id, el)}`

**Dùng khi:**

- Đọc size: `element.getBoundingClientRect()`
- Update position: `element.style.transform = ...`

---

### 2. `bodiesMap` - Map<id, Matter.Body>

```typescript
const bodiesMap = useRef<Map<string | number, Matter.Body>>(new Map());
```

**Mục đích:**

- Lưu physics bodies tương ứng với mỗi item
- Track body để update position

**Dùng khi:**

- Đọc position: `body.position`
- Modify physics: `Body.setInertia(body, Infinity)`

---

### 3. `sizesMap` - Map<id, {w, h}>

```typescript
const sizesMap = useRef<Map<string | number, { w: number; h: number }>>(
  new Map(),
);
```

**Mục đích:**

- Cache size sau lần đọc đầu tiên
- Tránh đọc DOM mỗi frame (performance)

**Tại sao cần cache?**

- `getBoundingClientRect()` chậm (reflow)
- Size không đổi sau khi init
- Đọc 1 lần, dùng mãi mãi

---

### 4. `engineRef` - Matter.Engine

```typescript
const engineRef = useRef<Matter.Engine | null>(null);
```

**Mục đích:**

- Lưu physics engine
- Cần để cleanup: `Engine.clear(engine)`

---

### 5. `runnerRef` - Matter.Runner

```typescript
const runnerRef = useRef<Matter.Runner | null>(null);
```

**Mục đích:**

- Lưu simulation loop
- Cần để stop: `Runner.stop(runner)`

---

### 6. `renderRef` - Matter.Render

```typescript
const renderRef = useRef<Matter.Render | null>(null);
```

**Mục đích:**

- Lưu canvas renderer
- Cần để stop: `Render.stop(render)`

---

## 🎮 Luồng hoạt động chi tiết

### Bước 1: Component Mount

```typescript
useEffect(() => {
  // Hook chạy khi component mount
}, [items]);
```

---

### Bước 2: Đọc size từ DOM

```typescript
items.forEach((item) => {
  const domEl = itemRefs.current.get(item.id);
  const rect = domEl.getBoundingClientRect();
  const width = item.w ?? rect.width; // Fallback to DOM
  const height = item.h ?? rect.height;

  // Cache size
  sizesMap.current.set(item.id, { w: width, h: height });
});
```

**Tại sao đọc từ DOM?**

- Size có thể do CSS quyết định
- Không cần hardcode trong data
- Flexible và maintainable

---

### Bước 3: Tạo Physics Bodies

```typescript
const body = Bodies.rectangle(
  startX, // Vị trí X ngẫu nhiên
  startY, // Vị trí Y (trên cao)
  width, // Chiều rộng
  height, // Chiều cao
  {
    restitution: 0.5, // Độ nảy
    friction: 0.1, // Ma sát
    density: 0.001, // Khối lượng
  },
);

// Xoay ngẫu nhiên
Body.setAngle(body, (Math.random() - 0.5) * 0.5);

// Lưu vào Map
bodiesMap.current.set(item.id, body);

// Add vào world
Composite.add(engine.world, body);
```

---

### Bước 4: Tạo Walls (Tường)

```typescript
const walls = [
  // Sàn (bottom)
  Bodies.rectangle(width / 2, height + 25, width, 50, { isStatic: true }),

  // Trái (left)
  Bodies.rectangle(-25, height / 2, 50, height, { isStatic: true }),

  // Phải (right)
  Bodies.rectangle(width + 25, height / 2, 50, height, { isStatic: true }),
];

Composite.add(engine.world, walls);
```

**isStatic: true** = Tường không di chuyển

---

### Bước 5: Setup Mouse Interaction

```typescript
const mouseConstraint = MouseConstraint.create(engine, {
  mouse: mouse,
  constraint: { stiffness: 0.2 },
});

// Khi bắt đầu kéo
Events.on(mouseConstraint, 'startdrag', (event) => {
  const body = event.body;
  Body.setInertia(body, Infinity); // Không xoay khi kéo
});

// Khi thả ra
Events.on(mouseConstraint, 'enddrag', (event) => {
  const body = event.body;
  Body.setInertia(body, defaultInertia); // Restore xoay
});
```

---

### Bước 6: Start Simulation

```typescript
// Start physics loop
const runner = Runner.create();
Runner.run(runner, engine);

// Start canvas rendering (debug)
Render.run(render);

// Start DOM update loop
const update = () => {
  items.forEach((item) => {
    // Sync physics → DOM
  });
  requestAnimationFrame(update);
};
update();
```

---

### Bước 7: Cleanup khi Unmount

```typescript
return () => {
  cancelAnimationFrame(animationId);
  Runner.stop(runner);
  Render.stop(render);
  Engine.clear(engine);
  bodiesMap.current.clear();
  sizesMap.current.clear();
};
```

**Tại sao cần cleanup?**

- Tránh memory leaks
- Stop các loops đang chạy
- Clear references

---

## 🐛 Troubleshooting

### Vấn đề 1: Elements không hiển thị

**Nguyên nhân:**

- Thiếu `position: absolute`
- Thiếu `left: 0, top: 0`

**Giải pháp:**

```typescript
style={{
  position: 'absolute',
  left: 0,
  top: 0,
  visibility: 'hidden' // Hook sẽ set visible
}}
```

---

### Vấn đề 2: Position bị lệch

**Nguyên nhân:**

- Size đọc từ DOM không khớp với physics body
- Transform tính từ vị trí sai

**Giải pháp:**

- Cache size sau lần đọc đầu tiên
- Dùng cached size cho cả physics và DOM

---

### Vấn đề 3: Images không load → size = 0

**Nguyên nhân:**

- Next.js Image lazy loading
- Hook đọc size trước khi image load xong

**Giải pháp:**

```typescript
<Image priority={true} />  // Force load ngay
```

---

### Vấn đề 4: Lag/Performance issue

**Nguyên nhân:**

- Dùng useState thay vì useRef
- Đọc DOM mỗi frame

**Giải pháp:**

- Dùng useRef cho mutable data
- Cache size, không đọc lại

---

### Vấn đề 5: Elements nhảy lung tung

**Nguyên nhân:**

- Không set `visibility: hidden` ban đầu
- Elements hiển thị ở vị trí default trước khi physics update

**Giải pháp:**

```typescript
visibility: 'hidden'; // Hook sẽ set 'visible' sau
```

---

## 📚 Tài liệu tham khảo

### Matter.js Official Docs

- [Matter.js Documentation](https://brm.io/matter-js/docs/)
- [Matter.js Examples](https://brm.io/matter-js/demo/)

### React Docs

- [useRef Hook](https://react.dev/reference/react/useRef)
- [useEffect Hook](https://react.dev/reference/react/useEffect)

### Performance

- [CSS Transform Performance](https://web.dev/animations-guide/)
- [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)

---

## 🎓 Tóm tắt

### Cơ chế hoạt động:

1. **React** render DOM elements
2. **Hook** đọc size từ DOM
3. **Matter.js** tạo physics bodies
4. **Runner** chạy physics simulation (60 FPS)
5. **RAF loop** đồng bộ physics → DOM (60 FPS)
6. **User** thấy elements rơi, va chạm, kéo thả

### Key Points:

- ✅ Dùng **useRef** cho mutable data (không re-render)
- ✅ **Cache size** để tránh đọc DOM mỗi frame
- ✅ **2 loops song song**: Physics loop + DOM update loop
- ✅ **transform3d** cho GPU acceleration
- ✅ **Cleanup** để tránh memory leaks

### Pattern này dùng cho:

- Matter.js (Physics)
- Three.js (3D)
- D3.js (Data viz)
- Canvas APIs
- Bất kỳ external library nào cần sync với React

---
