import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 10, 
  duration: "30s",
};

export default function () {
  const url = "http://localhost:4100/GRND/login"; 
  const payload = JSON.stringify({
    email: "test@test.com",   
    password: "ClaveSegura08!",
  });

  const params = {
    headers: { "Content-Type": "application/json" },
  };

  const res = http.post(url, payload, params);


  console.log(`Status: ${res.status}, Body: ${res.body}`);

check(res, { 'tarda menos de 2000ms': (r) => r.timings.duration < 2000 });


  sleep(1); 
}
