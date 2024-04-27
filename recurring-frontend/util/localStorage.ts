"use client";
export const storeObject = (key: string, object: any) => {
  if (typeof window !== "undefined") {
    const jsonString = JSON.stringify(object);
    localStorage.setItem(key, jsonString);
  }
};

export const getObject = (key: string) => {
  if (typeof window !== "undefined") {
    const jsonString: any = localStorage.getItem(key);
    return JSON.parse(jsonString);
  }
  return null; // Return null if executed on the server
};

export const deleteObject = (key: string) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};
