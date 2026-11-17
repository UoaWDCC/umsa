import { useState } from "react";
import { useParams } from "react-router-dom";

export default function AdminDetails() {
  const params = useParams();
  const admin = params.adminEmail;
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
          {!passwordForm && (
            <button onClick={showForm} className="hover:cursor-pointer">
              Forgot Password
            </button>
          )}

          {passwordForm && (
            <form className="flex flex-col gap-5 mt-10">
              <input
                type="password"
                name="old-password"
                placeholder="Enter Current Password:"
                className="bg-accent1-primary p-3"
                required
              />
              <input
                type="password"
                name="new-password"
                placeholder="Enter New Password:"
                className="bg-accent1-primary p-3"
                required
              />
              <button className="bg-accent1-primary p-4 hover:cursor-pointer">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
