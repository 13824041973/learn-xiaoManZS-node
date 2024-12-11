<script setup>
import { md5 } from "md5js";

// 创建的指纹（canvas会根据浏览器的不同，设备的不同生成不同的url）
const createBrowserFingerprint = () => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "red";
  ctx.fillRect(0, 0, 1, 1);
  return md5(canvas.toDataURL());
};

const ws = new WebSocket("ws://192.168.1.20:3001"); // 本地socket服务 IP
ws.addEventListener("open", () => {
  ws.send(
    JSON.stringify({
      action: "login",
      id: 1,
      fingerprint: createBrowserFingerprint(),
    })
  );
});
ws.addEventListener("message", (msg) => {
  const data = JSON.parse(msg.data);
  if (data.action === "logout") {
    alert(data.message);
  }
});
</script>

<template>
  <h1>SDL</h1>
</template>
