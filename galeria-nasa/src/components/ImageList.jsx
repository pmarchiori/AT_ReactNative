import { useState, useEffect, useRef } from "react";
import nasaApi from "../api/nasaApi";

export default function ImageList() {
  const [category, setCategory] = useState("earth");
  const [imageList, setImageList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const flatListReference = useRef(null);

  const fetchImages = async () => {
    setIsLoading(true);
    const fetchedData = await nasaApi.fetchImages(category, currentPage);
    setImageList((prevData) => [...prevData, ...fetchedData]);
    setIsLoading(false);
  };

  const changeCategory = (newCategory) => {
    setCategory(newCategory);
    setCurrentPage(1);
    setImageList([]);
  };

  const navigatePage = (step) => {
    setCurrentPage((prevPage) => Math.max(prevPage + step, 1));
  };

  const refreshGallery = async () => {
    setIsRefreshing(true);
    setCurrentPage(1);
    setImageList([]);
    await fetchImages();
    setIsRefreshing(false);
  };

  const loadMoreImages = () => {
    if (!isLoading) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const trackScroll = (event) => {
    const totalHeight = event.nativeEvent.contentSize.height;
    const currentOffset = event.nativeEvent.contentOffset.y;
    const visibleHeight = event.nativeEvent.layoutMeasurement.height;
    const scrollPercentage = currentOffset / (totalHeight - visibleHeight);
    setProgressValue(scrollPercentage);
  };

  useEffect(() => {
    fetchImages();
  }, [category, currentPage]);

  return {
    category,
    imageList,
    currentPage,
    isRefreshing,
    isLoading,
    progressValue,
    flatListReference,
    changeCategory,
    navigatePage,
    loadMoreImages,
    refreshGallery,
    trackScroll,
  };
}
