import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import LayoutArtist from "./app/views/Components/Page/LayoutArtist";
import ListSetlist from "./app/views/Components/Page/ManageSetlist/ListSetlist";
import ListMember from "./app/views/Components/Page/ManageMember/ListMember";
import ListSongs from "./app/views/Components/Page/ManageSongs/ListSongs";
import IndexStagePlot from "./app/views/Components/Page/ManageStagePlot/IndexStagePlot";
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
import ListArtist from "./app/views/Components/Page/ManageArtist/ListArtist";

import ListSetlistDetail from "./app/views/Components/Page/ManageSetlist/ListSetlistDetail";
import ListDetailSong from './app/views/Components/Page/ManageSongs/ListDetailSong';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signin/" element={<SignIn />} />
        <Route path="/signup/" element={<SignUp />} />

        <Route path="/list-artist" element={<ListArtist />} />
        <Route path="/artist&&name=:name&&id=:id/" element={<LayoutArtist />}>
          {/* setlist */}
          <Route path="setlist" element={<ListSetlist />} />
          <Route
            path="setlist/name-setlist=:name_setlist&&id_setlist=:id_setlist"
            element={<ListSetlistDetail />}
          />
          <Route path="setlist/add" element={<AddSetlist />} />
          <Route
            path="setlist/edit&&name_setlist=:name_setlist&&id_setlist=:id_setlist"
            element={<EidtSetlist />}
          />

          {/* member */}
          <Route path="member" element={<ListMember />} />
          <Route path="member/add" element={<AddMember />} />
          <Route
            path="member/edit&&name-member=:name_member&&idMember=:id_member"
            element={<EidtMember />}
          />
          {/* song */}
          <Route path="songs" element={<ListSongs />} />
          <Route
            path="songs/name-song=:name_song&&id-song=:id_song"
            element={<ListDetailSong />}
          />
          <Route path="song/add" element={<AddSong />} />
          <Route
            path="song/edit&&name_song=:name_song&&id_song=:id_song"
            element={<EidtSong />}
          />

          {/* stage-plot */}
          {/* <Route
            path="setlist/name-setlist=:name_setlist&&id_setlist=:id_setlist/stage-plot"
            element={<IndexStagePlot />}
          /> */}
          <Route
            path="setlist/name-setlist=:name_setlist&&id_setlist=:id_setlist/stage-plot"
            element={<AddStagePlot />}
          />
          <Route
            path="stage-plot/edit&&name=:name&&id=:id"
            element={<EditStagePlot />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
