import Dexie from "dexie";

const db = new Dexie("flashDB");
db.version(1).stores({
  schedules: "++id,startTime,endTime,sceContent,isNotification",
});

export default db;