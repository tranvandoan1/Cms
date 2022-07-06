import React from "react";
import { Route, Routes } from "react-router-dom";

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
import EidtSetlist from './app/views/Components/Page/ManageSetlist/EidtSetlist';
import AdminRoute from "./app/views/Auth/AdminRoute";
import AddStagePlot from "./app/views/Components/Page/ManageStagePlot/AddStagePlot";
import EditStagePlot from "./app/views/Components/Page/ManageStagePlot/EditStagePlot";

function App() {
  return (
    <Routes>
      <Route path="/admin/*" element={
        <AdminRoute>
          <LayoutAdmin />
        </AdminRoute>
      }>
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
        <Route path="manage-songs" element={<IndexSongs />} />
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
