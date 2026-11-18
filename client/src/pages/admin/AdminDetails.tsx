import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMe } from "../../hooks/useAuth";
import AdminPasswordForm from "../../components/AdminChangePassword.tsx";

export default function AdminDetails() {
  const params = useParams();
  const admin = params.adminEmail ?? "";
  const currentUser = useMe().data;
  const [changePassword, setChangePassword] = useState(false);

  const showChangePassword = () => {
    setChangePassword(true);
  };

  return (
    <>
      <div className="p-5 gap-10">
        <div>
          <h1 className="text-2xl">{admin} Details</h1>
        </div>

        <div>
          {!changePassword && currentUser?.email === admin && (
            <button
              onClick={showChangePassword}
              className="hover:cursor-pointer"
            >
              Change Password
            </button>
          )}

          {changePassword && <AdminPasswordForm />}
        </div>
      </div>
    </>
  );
}
