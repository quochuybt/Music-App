import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loading from "../components/common/Loading";
import AdminRoute from "./AdminRoute";
import ProtectedRoute from "./ProtectedRoute";

const AdminLayout = lazy(() => import("../components/admin/AdminLayout"));
const MainLayout = lazy(() => import("../components/layout/MainLayout"));
const AdminAlbumsPage = lazy(() => import("../pages/admin/AdminAlbumsPage"));
const AdminArtistsPage = lazy(() => import("../pages/admin/AdminArtistsPage"));
const AdminGenresPage = lazy(() => import("../pages/admin/AdminGenresPage"));
const AdminSongsPage = lazy(() => import("../pages/admin/AdminSongsPage"));
const AdminUsersPage = lazy(() => import("../pages/admin/AdminUsersPage"));
const DashboardPage = lazy(() => import("../pages/admin/DashboardPage"));
const SongFormPage = lazy(() => import("../pages/admin/SongFormPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));
const AlbumDetailPage = lazy(() => import("../pages/public/AlbumDetailPage"));
const AlbumsPage = lazy(() => import("../pages/public/AlbumsPage"));
const ArtistDetailPage = lazy(() => import("../pages/public/ArtistDetailPage"));
const ArtistsPage = lazy(() => import("../pages/public/ArtistsPage"));
const GenreDetailPage = lazy(() => import("../pages/public/GenreDetailPage"));
const HomePage = lazy(() => import("../pages/public/HomePage"));
const NotFoundPage = lazy(() => import("../pages/public/NotFoundPage"));
const SongDetailPage = lazy(() => import("../pages/public/SongDetailPage"));
const SongsPage = lazy(() => import("../pages/public/SongsPage"));
const FavoritesPage = lazy(() => import("../pages/user/FavoritesPage"));
const HistoryPage = lazy(() => import("../pages/user/HistoryPage"));
const PlaylistDetailPage = lazy(() => import("../pages/user/PlaylistDetailPage"));
const PlaylistPage = lazy(() => import("../pages/user/PlaylistPage"));
const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
}
