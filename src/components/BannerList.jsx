import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "../store/thunks/informationThunks";
import { useEffect } from "react";

function BannerList() {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  return (
    <div className="flex justify-between gap-8 mt-8 ">
      {data?.map((banner) => (
        <div
          key={banner.name}
          className="rounded-lg shadow-xl"
        >
          <img
            src={banner.banner_image}
            alt={banner.banner_name}
            className="w-full h-full"
          />
          <div></div>
        </div>
      ))}
    </div>
  );
}

export default BannerList;
