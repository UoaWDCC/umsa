import { useState, useEffect } from "react";
import { useLogout, useMe } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom";

interface AdminList {
  _id: string;
  email: string;
}
export default function AdminList() {
  const user = useMe().data;
  const logout = useLogout();
  const navigate = useNavigate();

  const [data, setData] = useState<AdminList[]>([]);
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const getAdminList = async () => {
    const response = await fetch("/api/admin/settings/admins");
    if (!response.ok) {
      const body = await response.json();
      setMessage(body.error.message);
      setError(true);
    } else {
      setData(await response.json());
    }
  };
  useEffect(() => {
    getAdminList();
  }, []);

  const onClick = async (admin: AdminList) => {
    const response = await fetch(`/api/admin/settings/admins/${admin._id}`, {
      method: "DELETE",
    });
    const body = await response.json();

    if (!response.ok) {
      setMessage(body.error.message);
      setError(true);
    } else if (admin.email == user?.email) {
      logout.mutate();
      navigate("/");
    } else {
      setMessage(body.message);
      getAdminList();
      setError(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center bt">
        <p className="mt-10 text-2xl">List of Admins:</p>
        <div className=" mt-10 border-2 flex-wrap justify-center w-full max-w-100">
          {data.map((admin, index) => (
            <Link
              to={`/admin/admins/${admin.email}`}
              key={index}
              className="flex flex-row justify-between bg-accent1-secondary border p-4 hover:border-accent1-primary"
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
            </Link>
          ))}
        </div>
        {message && (
          <p style={{ color: isError ? "red" : "green" }}>{message}</p>
        )}
      </div>
    </>
  );
}
