import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMe } from "../../hooks/useAuth";
import AdminPasswordForm from "../../components/AdminPasswordForm";
import AdminForgotPassword from "../../components/AdminForgotPassword";

export default function AdminDetails() {
  const params = useParams();
  const admin = params.adminEmail ?? "";
  const currentUser = useMe().data;
  const [changePassword, setChangePassword] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const showChangePassword = () => {
    setChangePassword(true);
  };
  const showForgotPassword = () => {
    setForgotPassword(true);
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

        <div>
          {!forgotPassword && (
            <button
              onClick={showForgotPassword}
              className="hover:cursor-pointer"
            >
              Forgot Password
            </button>
          )}
          {forgotPassword && <AdminForgotPassword />}
        </div>
      </div>
    </>
  );
}
