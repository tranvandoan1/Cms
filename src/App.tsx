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
import ListSetlistDetail from "./app/views/Components/Page/ManageSetlist/ListSetlistDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signin/" element={<SignIn />} />
      <Route path="/signup/" element={<SignUp />} />
      <Route path="/list-artist" element={<ListArtist />} />
      <Route path="/artist&&name=:name&&id=:id/" element={<LayoutArtist />}>
        <Route index element={<ListDetailArtist />} />
        <Route
          path="artist/edit&&name=:name&&id=:id"
          element={<EidtArtist />}
        />
        <Route path="setlist" element={<ListSetlist />} />
        <Route path="setlist/id=:id" element={<ListSetlistDetail />} />
        <Route path="setlist/add" element={<AddSetlist />} />
        <Route
          path="setlist/edit&&name=:name&&id=:id"
          element={<EidtSetlist />}
        />
        <Route path="member" element={<ListMember />} />
        <Route path="member/add" element={<AddMember />} />
        <Route
          path="member/edit&&name=:name&&id=:id"
          element={<EidtMember />}
        />
        <Route path="songs" element={<ListSongs />} />
        <Route path="song/add" element={<AddSong />} />
        <Route
          path="song/edit&&name_song=:name_song&&id_song=:id_song"
          element={<EidtSong />}
        />
        <Route path="stage-plot" element={<IndexStagePlot />} />
        <Route path="stage-plot/add" element={<AddStagePlot />} />
        <Route
          path="stage-plot/edit&&name=:name&&id=:id"
          element={<EditStagePlot />}
        />
      </Route>
    </Routes>
  );
}

export default App;
