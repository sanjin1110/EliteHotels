import useFetch from "../../hooks/useFetch";
import "./featured.css";

const Featured = () => {
  const { data, loading, error } = useFetch(
    "/hotels/countByCity?cities=pokhara,kathmandu,bhaktapur"
  );

  return (
    <div className="featured">
      {loading ? (
        "Loading please wait"
      ) : (
        <>
          <div className="featuredItem">
            <img
              src="https://blog.mytripary.com/wp-content/uploads/2022/05/Pokhara-valley-nepal.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Pokhara</h1>
              <h2>{data[0]} properties</h2>
            </div>
          </div>

          <div className="featuredItem">
            <img
              src="https://cdn.kimkim.com/files/a/content_articles/featured_photos/4a8eeecd5c9854938f39e98a5144100052e91af8/big-913b6140c12e08ffc98f736f2c99bb9b.jpg"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Kathmandu</h1>
              <h2>{data[1]} properties</h2>
            </div>
          </div>
          <div className="featuredItem">
            <img
              src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/ef/5c/33/nyatapola-bhaktapur.jpg?w=700&h=-1&s=1"
              alt=""
              className="featuredImg"
            />
            <div className="featuredTitles">
              <h1>Bhaktapur</h1>
              <h2>{data[2]} properties</h2>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Featured;
