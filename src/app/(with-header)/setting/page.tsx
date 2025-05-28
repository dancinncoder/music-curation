import React from "react";
import AuthenticationBox from "@/components/AuthenticationBox";
import ProfileContainer from "@/components/ProfileContainer";

export default async function SettingPage() {
  return (
    <div>
      setting page
      {/* {session ? <SignOutBtn /> : <SignInBtn />} */}
      <ProfileContainer />
      <AuthenticationBox />
    </div>
  );
}
