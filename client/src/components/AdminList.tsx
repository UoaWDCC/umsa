import { useState, useEffect } from "react";

interface AdminList {
  id: string;
  email: string;
}
export default function AdminList() {
  const [data, setData] = useState<AdminList[]>([]);

  const getAdminList = async () => {
    const response = await fetch("/api/admin/admin-list");
    setData(await response.json());
  };
  useEffect(() => {
    getAdminList();
  }, []);

  return (
    <>
      <div className="flex px-5 gap-10 flex-wrap justify-center">
        {data.map((admin, index) => (
          <div>
            <p>{index}</p>
            <p>{admin.email}</p>
          </div>
        ))}
      </div>
    </>
  );
}
