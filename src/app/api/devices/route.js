export async function POST(req) {
  const { deviceId, newName, status } = await req.json();
  console.log(`Device ID: ${deviceId}, Name: ${newName}, Status: ${status}`);
  // จัดการข้อมูลที่ได้รับ เช่น บันทึกข้อมูลหรืออัปเดตสถานะในฐานข้อมูล
  return new Response(
    JSON.stringify({ message: "Device updated successfully!" }),
    { status: 200 }
  );
}

export async function GET() {
  // ตัวอย่างข้อมูลอุปกรณ์ (ควรดึงจากฐานข้อมูลจริงในกรณีใช้งานจริง)
  const devices = [
    { id: "home01", name: "Device Home 01", status: "online" },
    // เพิ่มอุปกรณ์อื่นๆ
  ];
  return new Response(JSON.stringify(devices), { status: 200 });
}
