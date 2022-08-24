import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import MainLayout from "./layout/MainLayout";
import CategoryAddNew from "./module/category/CategoryAddNew";
import CategoryManage from "./module/category/CategoryManage";
import CategoryUpdate from "./module/category/CategoryUpdate";
import DashboardLayout from "./module/dashboard/DashboardLayout";
import PostAddNew from "./module/post/PostAddNew";
import PostManage from "./module/post/PostManager";
import PostUpdate from "./module/post/PostUpdate";
import UserAddNew from "./module/user/UserAddNew";
import UserManage from "./module/user/UserManage";
import UserProfile from "./module/user/UserProfile";
import UserUpdate from "./module/user/UserUpdate";
import BlogPage from "./pages/BlogPage";
import BookmarkPage from "./pages/BookmarkPage";
import CategoryPage from "./pages/CategoryPage";
import DashboardPage from "./pages/DashboardPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          <Route element={<MainLayout></MainLayout>}>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route
              path="/bookmark"
              element={<BookmarkPage></BookmarkPage>}
            ></Route>

            <Route
              path="/profile"
              element={<UserProfile></UserProfile>}
            ></Route>
            <Route
              path="blog/:slug"
              element={<PostDetailsPage></PostDetailsPage>}
            ></Route>
            <Route
              path="category/:slug"
              element={<CategoryPage></CategoryPage>}
            ></Route>
          </Route>
          <Route element={<DashboardLayout></DashboardLayout>}>
            <Route
              path="/manage/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/post"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/update-post"
              element={<PostUpdate></PostUpdate>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
            <Route
              path="/manage/update-category"
              element={<CategoryUpdate></CategoryUpdate>}
            ></Route>
            <Route
              path="/manage/user"
              element={<UserManage></UserManage>}
            ></Route>
            <Route
              path="/manage/add-user"
              element={<UserAddNew></UserAddNew>}
            ></Route>
            <Route
              path="/manage/update-user"
              element={<UserUpdate></UserUpdate>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;