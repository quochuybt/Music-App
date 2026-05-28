import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../components/admin/AdminLayout";
import MainLayout from "../components/layout/MainLayout";
import AdminAlbumsPage from "../pages/admin/AdminAlbumsPage";
import AdminArtistsPage from "../pages/admin/AdminArtistsPage";
import AdminGenresPage from "../pages/admin/AdminGenresPage";
import AdminSongsPage from "../pages/admin/AdminSongsPage";
import AdminUsersPage from "../pages/admin/AdminUsersPage";
import DashboardPage from "../pages/admin/DashboardPage";
import SongFormPage from "../pages/admin/SongFormPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import AlbumDetailPage from "../pages/public/AlbumDetailPage";
import AlbumsPage from "../pages/public/AlbumsPage";
import ArtistDetailPage from "../pages/public/ArtistDetailPage";
import ArtistsPage from "../pages/public/ArtistsPage";
import GenreDetailPage from "../pages/public/GenreDetailPage";
import HomePage from "../pages/public/HomePage";
import NotFoundPage from "../pages/public/NotFoundPage";
import SongDetailPage from "../pages/public/SongDetailPage";
import SongsPage from "../pages/public/SongsPage";
import FavoritesPage from "../pages/user/FavoritesPage";
import HistoryPage from "../pages/user/HistoryPage";
import PlaylistDetailPage from "../pages/user/PlaylistDetailPage";
import PlaylistPage from "../pages/user/PlaylistPage";
import ProfilePage from "../pages/user/ProfilePage";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="songs" element={<SongsPage />} />
        <Route path="songs/:id" element={<SongDetailPage />} />
        <Route path="artists" element={<ArtistsPage />} />
        <Route path="artists/:id" element={<ArtistDetailPage />} />
        <Route path="albums" element={<AlbumsPage />} />
        <Route path="albums/:id" element={<AlbumDetailPage />} />
        <Route path="genres/:id" element={<GenreDetailPage />} />
        <Route path="playlists" element={<ProtectedRoute><PlaylistPage /></ProtectedRoute>} />
        <Route path="playlists/:id" element={<ProtectedRoute><PlaylistDetailPage /></ProtectedRoute>} />
        <Route path="favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        <Route path="history" element={<ProtectedRoute><HistoryPage /></ProtectedRoute>} />
        <Route path="profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="not-found" element={<NotFoundPage />} />
      </Route>
      <Route path="/admin" element={<AdminRoute><AdminLayout /></AdminRoute>}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="songs" element={<AdminSongsPage />} />
        <Route path="songs/create" element={<SongFormPage />} />
        <Route path="songs/edit/:id" element={<SongFormPage />} />
        <Route path="artists" element={<AdminArtistsPage />} />
        <Route path="albums" element={<AdminAlbumsPage />} />
        <Route path="genres" element={<AdminGenresPage />} />
        <Route path="users" element={<AdminUsersPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}
