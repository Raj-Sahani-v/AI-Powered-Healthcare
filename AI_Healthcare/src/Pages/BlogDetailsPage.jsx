import { Details } from "../Components/BlogDetails/Details";
import { Comment } from "../Components/BlogDetails/Comment";
import { CommentForm } from "../Components/BlogDetails/CommentForm";
import { Search } from "../Components/BlogDetails/Sidebar/Search";
import { Category } from "../Components/BlogDetails/Sidebar/Category";
import { RecentPost } from "../Components/BlogDetails/Sidebar/RecentPost";
import { Tags } from "../Components/BlogDetails/Sidebar/Tags";
import { TextPlain } from "../Components/BlogDetails/Sidebar/TextPlain";
import { Image } from "../Components/BlogDetails/Sidebar/Image";

export const BlogDetailsPage = () => {
  return (
    <>
      <div class="container py-5">
        <div class="row g-5">
          <div class="col-lg-8">
            <Details />
            <Comment />
            <CommentForm />
          </div>

          {/* sidebar */}
          <div class="col-lg-4">
            <Search />
            <Category />
            <RecentPost />
            <Image />
            <Tags />
            <TextPlain />
          </div>
        </div>
      </div>
    </>
  );
};
