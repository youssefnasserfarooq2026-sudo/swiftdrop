import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://swiftdrop-sync-default-rtdb.firebaseio.com/"
});

const db = admin.database();
const queueRef = db.ref("swiftdrop_data/pushQueue");

async function run() {
  const snap = await queueRef.once("value");
  const queue = snap.val();
  if (!Array.isArray(queue) || queue.length === 0) {
    process.exit(0);
  }

  const keep = [];
  for (const item of queue) {
    if (!item?.token) continue;
    try {
      await admin.messaging().send({
        token: item.token,
        notification: {
          title: item.title || "SwiftDrop Logistics",
          body: item.body || "تحديث جديد على شحنتك"
        }
      });
    } catch (e) {
      const msg = String(e?.message || "");
      if (!msg.includes("not-registered") && !msg.includes("invalid-argument")) {
        keep.push(item);
      }
    }
  }

  await queueRef.set(keep);
  process.exit(0);
}

run().catch(() => process.exit(1));
