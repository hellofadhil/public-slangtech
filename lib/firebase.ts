import { initializeApp } from "firebase/app"
import { getDatabase, ref, get, Database } from "firebase/database"
import type { Class, Event } from "./types"

const firebaseConfig = {
  apiKey: "AIzaSyCDXGe7qYScSvBbT0ed44vfd7yj6GmGcoM",
  authDomain: "training-b34f7.firebaseapp.com",
  databaseURL: "https://training-b34f7-default-rtdb.firebaseio.com",
  projectId: "training-b34f7",
  storageBucket: "training-b34f7.firebasestorage.app",
  messagingSenderId: "946439855027",
  appId: "1:946439855027:web:6176004d1a919aa5be09c6",
  measurementId: "G-77LH0CR4EH",
}

// Initialize Firebase
let app
let database: Database

try {
  app = initializeApp(firebaseConfig)
  database = getDatabase(app)
} catch (error) {
  console.error("Firebase initialization error:", error)
}

export async function getClasses(): Promise<Class[]> {
  try {
    const classesRef = ref(database, "classes");
    const snapshot = await get(classesRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      const allowedStatuses: Class["status"][] = ["active", "upcoming", "on going"];

      const filterValidStatus = (classItem: Class) =>
        allowedStatuses.includes(classItem.status);

      if (typeof data === "object" && data !== null) {
        if (Array.isArray(data)) {
          return data.filter(Boolean).filter(filterValidStatus);
        } else {
          return Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
            }))
            .filter(filterValidStatus);
        }
      }
    }

    return [];
  } catch (error) {
    console.error("Error fetching classes:", error);
    return [];
  }
}


export async function getClassById(id: string): Promise<Class | null> {
  try {
    const classRef = ref(database, `classes/${id}`)
    const snapshot = await get(classRef)

    if (snapshot.exists()) {
      return {
        id,
        ...snapshot.val(),
      }
    }

    return null
  } catch (error) {
    console.error(`Error fetching class with id ${id}:`, error)
    return null
  }
}

export async function getFeaturedClasses(): Promise<Class[]> {
  try {
    // In a real app, you might have a "featured" field to query by
    // For now, we'll just get the first active class
    const classesRef = ref(database, "classes")
    const snapshot = await get(classesRef)

    if (snapshot.exists()) {
      const data = snapshot.val()

      if (typeof data === "object" && data !== null) {
        let classes: Class[] = []

        if (Array.isArray(data)) {
          classes = data.filter(Boolean)
        } else {
          classes = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        }

        // Find active classes and sort by price (descending) to get premium classes first
        const featuredClasses = classes
          .filter((c) => c.status === "active" || c.status === "on going")
          .sort((a, b) => b.price - a.price)
          .slice(0, 3)

        return featuredClasses
      }
    }

    return []
  } catch (error) {
    console.error("Error fetching featured classes:", error)
    return []
  }
}


export async function getEvents(): Promise<Event[]> {
  try {
    const eventsRef = ref(database, "events");
    const snapshot = await get(eventsRef);

    if (snapshot.exists()) {
      const data = snapshot.val();

      // If data is an object with keys, convert to array
      if (typeof data === "object" && data !== null) {
        if (Array.isArray(data)) {
          return data.filter(Boolean); // Filter out null/undefined entries
        } else {
          const events = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }));

          // For relational fields, we'll just ensure the name fields exist
          // The actual names should be populated when the event is created/updated
          return events.map(event => ({
            ...event,
            categoryName: event.categoryName || '',
            trainerName: event.trainerName || '',
            partnerName: event.partnerName || '',
          }));
        }
      }
    }

    // Return empty array if no data
    return [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}


export async function getEventById(id: string): Promise<Event | null> {
  try {
    const eventRef = ref(database, `events/${id}`)
    const snapshot = await get(eventRef)

    if (snapshot.exists()) {
      return {
        id,
        ...snapshot.val(),
      }
    }

    return null
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error)
    return null
  }
}
