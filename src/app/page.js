'use client';
import { useState, useEffect } from "react";
import axios from "axios";

const Home = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    // ดึงข้อมูลอุปกรณ์จาก API
    axios.get("/api/devices").then((response) => {
      setDevices(response.data);
    });
  }, []);

  const updateDevice = (deviceId, newName) => {
    axios.post("/api/devices", { deviceId, newName }).then((response) => {
      // อัปเดตสถานะในหน้าเว็บ
      setDevices(
        devices.map((device) =>
          device.id === deviceId ? { ...device, name: newName } : device
        )
      );
    });
  };

  return (
    <div>
      <h1>Device Management</h1>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            {device.name} - {device.status}
            <button onClick={() => updateDevice(device.id, "newName")}>
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
