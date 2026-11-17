import { useParams } from "react-router-dom";

export default function AdminDetails() {
  const params = useParams();
  const admin = params.adminEmail;
  return (
    <>
      <p>{admin}</p>
      <p>Individual Admin Page</p>
    </>
  );
}
