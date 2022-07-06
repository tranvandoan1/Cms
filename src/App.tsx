import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import "antd/dist/antd.css";
import LayoutAdmin from "./app/views/Components/Page/LayoutAdmin";
import IndexArtist from "./app/views/Components/Page/ManageArtist/IndexArtist";
import IndexSetlist from "./app/views/Components/Page/ManageSetlist/IndexSetlist";
import IndexMember from "./app/views/Components/Page/ManageMember/IndexMember";
import IndexSongs from "./app/views/Components/Page/ManageSongs/IndexSongs";
import IndexStagePlot from "./app/views/Components/Page/ManageStagePlot/IndexStagePlot";
import AddArtist from "./app/views/Components/Page/ManageArtist/AddArtist";
import EidtArtist from "./app/views/Components/Page/ManageArtist/EidtArtist";
import AddSetlist from "./app/views/Components/Page/ManageSetlist/AddSetlist";
import EidtSetlist from "./app/views/Components/Page/ManageSetlist/EidtSetlist";
import AdminRoute from "./app/views/Auth/AdminRoute";
import AddStagePlot from "./app/views/Components/Page/ManageStagePlot/AddStagePlot";
import EditStagePlot from "./app/views/Components/Page/ManageStagePlot/EditStagePlot";
import AddSong from "./app/views/Components/Page/ManageSongs/AddSong";
import EidtSong from "./app/views/Components/Page/ManageSongs/EidtSong";
import AddMember from "./app/views/Components/Page/ManageMember/AddMember";
import EidtMember from './app/views/Components/Page/ManageMember/EidtMember';

function App() {
  return (
    <Routes>
      <Route index element={<Navigate to="/admin/manage-artist" />} />
      <Route path="/admin/" element={<LayoutAdmin />}>
        <Route path="manage-artist" element={<IndexArtist />} />
        <Route path="manage-artist/add" element={<AddArtist />} />
        <Route
          path="manage-artist/edit&&name=:name&&id=:id"
          element={<EidtArtist />}
        />
        <Route path="manage-setlist" element={<IndexSetlist />} />
        <Route path="manage-setlist/add" element={<AddSetlist />} />
        <Route
          path="manage-setlist/edit&&name=:name&&id=:id"
          element={<EidtSetlist />}
        />
        <Route path="manage-member" element={<IndexMember />} />
        <Route path="manage-member/add" element={<AddMember />} />
        <Route
          path="manage-member/edit&&name=:name&&id=:id"
          element={<EidtMember />}
        />
        <Route path="manage-songs" element={<IndexSongs />} />
        <Route path="manage-songs/add" element={<AddSong />} />
        <Route
          path="manage-songs/edit&&name=:name&&id=:id"
          element={<EidtSong />}
        />
        <Route path="manage-stage-plot" element={<IndexStagePlot />} />
        <Route path="manage-stage-plot/add" element={<AddStagePlot />} />
        <Route
          path="manage-stage-plot/edit&&name=:name&&id=:id"
          element={<EditStagePlot />}
        />
      </Route>
    </Routes>
  );
}

export default App;
