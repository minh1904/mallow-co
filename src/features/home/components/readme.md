Hướng giải pháp:
- Tạo 4 bức tường vô hình
- Tạo body vật lí vô hình rồi gắn với button component
- về responsive , tôi sẽ tính width height dựa trên width height của button component (sẽ viết hàm tính toán)
- mỗi lần click sẽ push mảng array ảnh có sẵn lần lượt theo vị trị random , Khi vượt quá giới hạn số lượng đã định sẵn sẽ remove đi item bất kì hoặc đầu tiên.
- canvas + tường cũng resize theo div cha nắm ref (ưu tiên các div ngoài sử dụng tailwind cho dễ responsive)