"use client";

import getRecommend from "@/app/actions/getRecommend";
import isUserLoginModal from "@/app/hooks/useIsLogin";
import useRecommendModal from "@/app/hooks/useRecommend";
import { SafeAccommodation } from "@/app/types";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import ListingCard from "../listings/ListingCard";

interface EmptyStateProps {
  currentUser?: any;
  userPersonal?: any;
}

const Recommendation: React.FC<EmptyStateProps> = ({
  currentUser,
  userPersonal,
}) => {
  const {
    isCalled,
    data: recommendData,
    onChangeRecommendData,
  } = useRecommendModal();

  const [needCall, setNeedCall] = useState(true);

  const [recommendDataId, setRecommendDataId] = useState<string[]>([]);
  const [accommodation, setAccommodation] = useState<SafeAccommodation[]>([]);

  const renderData = useMemo(() => {
    if (recommendDataId?.length && accommodation?.length) {
      const recommendList: any[] = [];
      recommendDataId?.map((item: string) => {
        const temp = accommodation.findIndex(
          (data) =>
            data?.id === item ||
            (data as any)?._id === item ||
            data?.id === (item as any)?._id ||
            data?.id === (item as any)?.id ||
            (data as any)?._id === (item as any)?._id ||
            (data as any)?._id === (item as any)?.id
        );

        if (temp > -1) {
          recommendList.push(temp);
        }
      });

      return recommendList;
    }
    return [];
  }, [recommendDataId, accommodation]);

  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    axios
      .post("/api/accommodation-list", {})
      .then((res) => {
        const data = res?.data?.data?.map((item: SafeAccommodation) => {
          const {
            accommodationType,
            address,
            area,
            bathrooms,
            beds,
            convenient,
            detailDescription,
            featured,
            guest,
            id,
            pricesPerDate,
            properties,
            rooms,
          } = item;
          return {
            accommodationType,
            address,
            area,
            bathrooms,
            beds,
            convenient,
            detailDescription,
            featured,
            guest,
            id,
            pricesPerDate,
            properties,
            rooms,
          };
        });
        setAccommodation(data || []);
      })
      .catch((error) => {
        setAccommodation([]);
      });
  }, [userPersonal]);

  useEffect(() => {
    async () => {
      console.log("dang lay recommend data");

      const { age, gender, specialFeatures } = userPersonal || {};

      if (isCalled && accommodation.length && needCall) {
        setNeedCall(false);
        const data = await getRecommend({
          accommodation: accommodation,
          // onSuccess: onChangeRecommendData,
          queryData: {
            isNotUseDefault: age || gender || specialFeatures?.length,
            ...(age ? { age } : {}),
            ...(gender ? { gender } : {}),
            ...(specialFeatures ? { requirement: specialFeatures } : {}),
          },
        });

        if (data.length) {
          setRecommendDataId(data);
        }
      }
    };
  }, [
    recommendData,
    userPersonal,
    currentUser,
    onChangeRecommendData,
    accommodation,
    isCalled,
    needCall,
  ]);

  const handleNextPage = () => {
    setCurrentPage((prev) => {
      if (prev + 1 < accommodation.length / 4 && accommodation.length > 4) {
        return prev + 1;
      } else return 0;
    });
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => {
      if (prev > 0 && accommodation.length > 4) {
        return prev - 1;
      } else {
        return (accommodation.length - (accommodation.length % 4)) / 4 - 1;
      }
    });
  };

  useEffect(() => {
    if (!!renderData.length && currentUser?.id && !needCall) {
      if (!recommendDataId?.length) {
        axios
          .post("/api/recommendation", {
            recommendList: renderData,
          })
          .then(() => {
            //
          })
          .catch((error) => {
            // toast.error(error.message)
          })
          .finally(() => {
            // setIsLoading(false)
          });
      } else {
        axios
          .put("/api/recommendation", {
            recommendList: renderData,
          })
          .then(() => {
            //
          })
          .catch((error) => {
            // toast.error(error.message)
          })
          .finally(() => {
            // setIsLoading(false)
          });
      }
    }
  }, [currentUser, renderData, recommendDataId, needCall]);

  useEffect(() => {
    if (currentUser) {
      axios
        .post("/api/recommend-list", {})
        .then((res) => {
          if (res?.data?.recommendList?.length) {
            setRecommendDataId(res.data.recommendList);
          }
        })
        .catch((error) => {
          // toast.error(error.message)
        })
        .finally(() => {
          // setIsLoading(false)
        });
    }
  }, [currentUser]);

  return (
    <>
      {!!currentUser && !!renderData.length && (
        <>
          <h1 className="my-4 font-extrabold xl:text-4xl md:text-3xl">
            Best recommend for you
          </h1>
          <h3 className="mb-5">
            Base on your hobby, this is some recommend, which is best suit for
            you
          </h3>

          <div className="min-h-[40vh] flex w-full overflow-x-hidden px-5 pr-5 justify-between items-center gap-8">
            <button
              className="relative z-20 flex items-center justify-center p-4 text-5xl font-black text-red-500 bg-transparent rounded-md h-9 px-9 hover:shadow-2xl"
              onClick={handlePrevPage}
            >
              {"<"}
            </button>
            <div className="grid w-full h-full grid-cols-4 gap-4">
              {renderData
                ?.slice?.(currentPage * 4, (currentPage + 1) * 4)
                ?.map?.((element: any, index) => (
                  <ListingCard
                    currentUser={currentUser}
                    key={index + element?.id}
                    data={element}
                  />
                ))}
            </div>

            <button
              className="relative z-20 flex items-center justify-center p-4 text-5xl font-black text-red-500 bg-transparent rounded-md h-9 px-9 hover:shadow-2xl"
              onClick={handleNextPage}
            >
              {">"}
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default Recommendation;
