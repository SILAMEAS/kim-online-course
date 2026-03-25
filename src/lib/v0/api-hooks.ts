// mockApi.ts
import { useEffect, useState } from "react";

/* -------------------- FAKE DELAY -------------------- */
const delay = (ms = 300) => new Promise((res) => setTimeout(res, ms));

/* -------------------- MOCK DATABASE -------------------- */
const db = {
  users: [
    { id: "1", name: "John Doe", email: "john@example.com" },
    { id: "2", name: "Jane Smith", email: "jane@example.com" },
  ],
  courses: [
    { id: "1", title: "React Course", price: 50 },
    { id: "2", title: "Spring Boot Course", price: 80 },
  ],
  videos: [{ id: "1", title: "Intro Video", courseId: "1" }],
  payments: [],
  enrollments: [],
  images: [],
};

/* -------------------- GENERIC HOOK -------------------- */
function useMockResource<T>(key: keyof typeof db) {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      await delay();
      setData([...db[key]] as T[]);
      setLoading(false);
    };
    load();
  }, [key]);

  return {
    data,
    isLoading,
    setData,
  };
}

/* -------------------- GENERIC CRUD -------------------- */
async function createItem<T>(key: keyof typeof db, item: T) {
  await delay();
  const newItem = { id: Date.now().toString(), ...item };
  (db[key] as any).push(newItem);
  return newItem;
}

async function updateItem<T>(key: keyof typeof db, id: string, item: Partial<T>) {
  await delay();
  const list = db[key] as any[];
  const index = list.findIndex((i) => i.id === id);

  if (index !== -1) {
    list[index] = { ...list[index], ...item };
    return list[index];
  }

  return null;
}

async function deleteItem(key: keyof typeof db, id: string) {
  await delay();
  const list = db[key] as any[];
  const index = list.findIndex((i) => i.id === id);

  if (index !== -1) {
    list.splice(index, 1);
  }

  return { success: true };
}

/* -------------------- USERS -------------------- */
export function useUsers() {
  const { data, isLoading, setData } = useMockResource<any>("users");

  return {
    users: data,
    isLoading,
    setUsers: setData,
  };
}

export const createUser = (data: any) => createItem("users", data);
export const updateUser = (id: string, data: any) =>
    updateItem("users", id, data);
export const deleteUser = (id: string) => deleteItem("users", id);

/* -------------------- COURSES -------------------- */
export function useCourses() {
  const { data, isLoading, setData } = useMockResource<any>("courses");

  return {
    courses: data,
    isLoading,
    setCourses: setData,
  };
}

export const createCourse = (data: any) => createItem("courses", data);
export const updateCourse = (id: string, data: any) =>
    updateItem("courses", id, data);
export const deleteCourse = (id: string) => deleteItem("courses", id);

/* -------------------- VIDEOS -------------------- */
export function useVideos() {
  const { data, isLoading, setData } = useMockResource<any>("videos");

  return {
    videos: data,
    isLoading,
    setVideos: setData,
  };
}

export const createVideo = (data: any) => createItem("videos", data);
export const updateVideo = (id: string, data: any) =>
    updateItem("videos", id, data);
export const deleteVideo = (id: string) => deleteItem("videos", id);

/* -------------------- PAYMENTS -------------------- */
export function usePayments() {
  const { data, isLoading, setData } = useMockResource<any>("payments");

  return {
    payments: data,
    isLoading,
    setPayments: setData,
  };
}

export const createPayment = (data: any) => createItem("payments", data);
export const updatePayment = (id: string, data: any) =>
    updateItem("payments", id, data);
export const deletePayment = (id: string) => deleteItem("payments", id);

/* -------------------- ENROLLMENTS -------------------- */
export function useEnrollments() {
  const { data, isLoading, setData } = useMockResource<any>("enrollments");

  return {
    enrollments: data,
    isLoading,
    setEnrollments: setData,
  };
}

export const createEnrollment = (data: any) =>
    createItem("enrollments", data);
export const updateEnrollment = (id: string, data: any) =>
    updateItem("enrollments", id, data);
export const deleteEnrollment = (id: string) =>
    deleteItem("enrollments", id);

/* -------------------- IMAGES -------------------- */
export function useImages() {
  const { data, isLoading, setData } = useMockResource<any>("images");

  return {
    images: data,
    isLoading,
    setImages: setData,
  };
}

export const createImage = (data: any) => createItem("images", data);
export const updateImage = (id: string, data: any) =>
    updateItem("images", id, data);
export const deleteImage = (id: string) => deleteItem("images", id);