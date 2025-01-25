import { VercelRequest, VercelResponse } from "@vercel/node";
import fetch from "node-fetch";

export default async function handler(
  req = VercelRequest,
  res = VercelResponse
) {
  const { events } = req.body;

  if (!events || events.length === 0) {
    return res.status(400).json({ message: "No events found" });
  }

  for (const event of events) {
    const userId = event.source.userId;
    const messageText = event.message.text.trim();

    if (messageText === ".connect") {
      await sendToESP32(userId, "connect");
      sendQuickReply(event.replyToken, "User connected");
    } else if (messageText === ".getid") {
      await sendToESP32(userId, "getid");
      sendQuickReply(event.replyToken, `Your LINE User ID: ${userId}`);
    } else if (messageText === ".remove") {
      await sendToESP32(userId, "remove");
      sendQuickReply(event.replyToken, "User removed");
    } else {
      sendQuickReply(event.replyToken, "Invalid command");
    }
  }

  res.status(200).json({ message: "OK" });
}

async function sendQuickReply(replyToken, message) {
  const accessToken =
    "IpzWTT0hfdbEvsyUSGbYiFxqyrlVC846CJrpCISWfddPv1MdskfNPkxwXx5/l+IUx3Fr7n8AYV/ykMSsLzDiE2hK4OKoTM83u0HtZ93azDPfSC5QmCKrnEE3hVRc3aGeP5fvo7YF6h0oveT7H0F6RwdB04t89/1O/w1cDnyilFU=";
  const payload = {
    replyToken,
    messages: [{ type: "text", text: message }],
  };

  await fetch("https://api.line.me/v2/bot/message/reply", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });
}

async function sendToESP32(userId, command) {
  const esp32Url = `http://dataservice2.ddns/${command}?userId=${encodeURIComponent(
    userId
  )}`;
  const response = await fetch(esp32Url);
  if (!response.ok) {
    throw new Error("Failed to send to ESP32");
  }
}
