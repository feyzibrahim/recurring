"use client";
export const storeObject = (key: string, object: any) => {
  const jsonString = JSON.stringify(object);
  localStorage.setItem(key, jsonString);
};

export const getObject = (key: string) => {
  const jsonString: any = localStorage.getItem(key);
  return JSON.parse(jsonString);
};

export const deleteObject = (key: string) => {
  return localStorage.removeItem(key);
};
