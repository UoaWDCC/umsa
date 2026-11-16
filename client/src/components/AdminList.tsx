import { useState, useEffect } from "react";

interface AdminList {
  email: string;
}
export default function AdminList() {
  const [data, setData] = useState<AdminList[]>([]);
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const getAdminList = async () => {
    const response = await fetch("/api/admin/admin-list");
    setData(await response.json());
  };
  useEffect(() => {
    getAdminList();
  }, []);

  const onClick = async (admin: AdminList) => {
    const response = await fetch("/api/admin/admin-list/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: admin.email }),
    });
    const body = await response.json();

    if (!response.ok) {
      setMessage(body.error.message);
      setError(true);
    } else {
      setMessage(body.message);
      getAdminList();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bt">
        <p className="mt-10 text-2xl">List of Admins:</p>
        <div className=" mt-10 border-2 flex-wrap justify-center w-full max-w-100">
          {data.map((admin, index) => (
            <div
              key={index}
              className="flex flex-row justify-between bg-accent1-secondary border p-4"
            >
              <p>{index + 1}</p>
              <p>{admin.email}</p>
              <button
                onClick={() => {
                  onClick(admin);
                }}
              >
                Delete
              </button>

              {message && (
                <p style={{ color: isError ? "red" : "green" }}>{message}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
