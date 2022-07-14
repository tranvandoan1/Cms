import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import "antd/dist/antd.css";
import LayoutArtist from "./app/views/Components/Page/LayoutArtist";
import ListDetailArtist from "./app/views/Components/Page/ManageArtist/ListDetailArtist";
import ListSetlist from "./app/views/Components/Page/ManageSetlist/ListSetlist";
import ListMember from "./app/views/Components/Page/ManageMember/ListMember";
import ListSongs from "./app/views/Components/Page/ManageSongs/ListSongs";
import IndexStagePlot from "./app/views/Components/Page/ManageStagePlot/IndexStagePlot";
import AddArtist from "./app/views/Components/Page/ManageArtist/AddArtist";
import EidtArtist from "./app/views/Components/Page/ManageArtist/EidtArtist";
import AddSetlist from "./app/views/Components/Page/ManageSetlist/AddSetlist";
import EidtSetlist from "./app/views/Components/Page/ManageSetlist/EidtSetlist";
import AddStagePlot from "./app/views/Components/Page/ManageStagePlot/AddStagePlot";
import EditStagePlot from "./app/views/Components/Page/ManageStagePlot/EditStagePlot";
import AddSong from "./app/views/Components/Page/ManageSongs/AddSong";
import EidtSong from "./app/views/Components/Page/ManageSongs/EidtSong";
import AddMember from "./app/views/Components/Page/ManageMember/AddMember";
import EidtMember from "./app/views/Components/Page/ManageMember/EidtMember";
import SignUp from "./app/views/Components/LogIn/SignUp";
import SignIn from "./app/views/Components/LogIn/SignIn";
import ListArtist from "./app/views/Components/Page/ListArtist";
import AdminRoute from "./app/views/Auth/AdminRoute";
import IndexGeneratePassword from "./app/views/Components/Page/ManageGene/IndexGeneratePassword";
import AddGeneratePassword from "./app/views/Components/Page/ManageGene/AddGeneratePassword";
import EditGeneratePassword from "./app/views/Components/Page/ManageGene/EditGeneratePassword";


function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<SignIn />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/list-artist" element={<ListArtist />} /> */}
      {/* <Route index element={<Navigate to="/admin/manage-artist" />} /> */}
      {/* <Route
        path="/detail_artist/name=:name&&id=:id/"
        element={<LayoutArtist />}
      >
        <Route index element={<ListDetailArtist />} />
        <Route
          path="/manage-artist/edit&&name=:name&&id=:id"
          element={<EidtArtist />}
        />
        <Route path="manage-setlist" element={<ListSetlist />} />
        <Route path="manage-setlist/add" element={<AddSetlist />} />
        <Route
          path="manage-setlist/edit&&name=:name&&id=:id"
          element={<EidtSetlist />}
        />
        <Route path="manage-member" element={<ListMember />} />
        <Route path="manage-member/add" element={<AddMember />} />
        <Route
          path="manage-member/edit&&name=:name&&id=:id"
          element={<EidtMember />}
        />
        <Route path="manage-songs" element={<ListSongs />} />
        <Route path="manage-songs/add" element={<AddSong />} />
        <Route
          path="manage-songs/edit&&name=:name&&id=:id"
          element={<EidtSong />}
        />
        <Route path="/manage-stage-plot" element={<IndexStagePlot />} />
        <Route path="/manage-stage-plot/add" element={<AddStagePlot />} />
        <Route
          path="/manage-stage-plot/edit&&name=:name&&id=:id"
          element={<EditStagePlot />}
        />
        <Route
          path="/manage-generate-password"
          element={<IndexGeneratePassword />}
        />
        <Route
          path="manage-generate-password/add"
          element={<AddGeneratePassword />}
        />
        <Route
          path="/manage-generate-password/edit&&email=:email&&id=:id"
          element={<EditGeneratePassword />}
        />
      </Route> */}
      <Route path="/manage-stage-plot" element={<IndexStagePlot />} />
      <Route path="/manage-stage-plot/add" element={<AddStagePlot />} />
    </Routes>
  );
}

export default App;
