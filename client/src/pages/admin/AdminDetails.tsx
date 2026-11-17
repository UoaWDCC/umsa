import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMe } from "../../hooks/useAuth";
import AdminPasswordForm from "../../components/AdminPasswordForm";

export default function AdminDetails() {
  const params = useParams();
  const admin = params.adminEmail ?? "";
  const currentUser = useMe().data;
  const [passwordForm, setPasswordForm] = useState(false);
  const showForm = () => {
    setPasswordForm(true);
  };

  return (
    <>
      <div className="p-5 gap-5">
        <div>
          <h1 className="text-2xl">{admin} Details</h1>
        </div>

        <div>
          {!passwordForm && currentUser?.email === admin && (
            <button onClick={showForm} className="hover:cursor-pointer">
              Change Password
            </button>
          )}

          {passwordForm && <AdminPasswordForm />}
        </div>
      </div>
    </>
  );
}
