"use client";

import styles from "./AmazonProductListRender.module.scss";
import { AmazonProductObj } from "@/utilities/customTypes";
import StarRatings from "react-star-ratings";
import useScreenDevice from "@/hooks/useScreenDevice";
import { useAnalyticsAPI } from "@/utilities/useAPI";

type AmazonProductListRenderProps = {
  amazonProductList: AmazonProductObj[];
  isLoading: boolean;
  sessionId: string;
};

export default function AmazonProductListRender(
  props: AmazonProductListRenderProps
) {
  const screenDevice = useScreenDevice();

  const logChoose = (productObj: AmazonProductObj) => {
    useAnalyticsAPI({
      actionType: "pc",
      sessionId: props.sessionId,
      title: productObj.title,
      rating: productObj.rating,
      reviewsCount: productObj.reviewsCount,
      price: productObj.price,
      currencySymbol: productObj.currencySymbol,
      url: productObj.linkUrl,
    });

    return true;
  };

  const renderAmazonProductList = () => {
    const toReturn = props.amazonProductList.map((productObj) => {
      return (
        <ProductBlock
          productObj={productObj}
          key={productObj.title}
          isMobile={screenDevice.isMobile}
          isLoading={props.isLoading}
          onChoose={logChoose}
        ></ProductBlock>
      );
    });

    if (props.isLoading) {
      for (let i = 0; i < 10; i++) {
        const toAdd = (
          <LoadingProductBlock
            key={"loading-product-" + i}
            isMobile={screenDevice.isMobile}
          ></LoadingProductBlock>
        );

        toReturn.push(toAdd);
      }
    }

    return toReturn;
  };

  return <div className={styles.container}>{renderAmazonProductList()}</div>;
}

type ProductBlockProps = {
  productObj: AmazonProductObj;
  isMobile: boolean;
  isLoading: boolean;
  onChoose: (obj: AmazonProductObj) => void;
};

function ProductBlock(props: ProductBlockProps) {
  return (
    <div className={styles.productBlockContainer}>
      <ProductImg {...props} />
      <ProductCopy {...props} />
    </div>
  );
}

type LoadingProductBlockProps = {
  isMobile: boolean;
};
function LoadingProductBlock(props: LoadingProductBlockProps) {
  const cnContainer = () => {
    const cn = [styles.loadingProductBlockContainer];
    if (props.isMobile) {
      cn.push(styles.mobile);
    }
    return cn.join(" ");
  };
  return (
    <div className={cnContainer()}>
      <div />
    </div>
  );
}
const ProductImg = (props: ProductBlockProps) => {
  const { productObj } = props;

  let imgSrc = productObj.imageUrl;
  if (!props.isMobile) imgSrc = imgSrc.replace("UY218", "UL320");

  const linkUrl = productObj.linkUrl;

  return (
    <a
      href={linkUrl}
      className={["hiddenLink", styles.productImgLink].join(" ")}
      target="_blank"
      onClick={() => props.onChoose(props.productObj)}
    >
      <div className={styles.productImgContainer}>
        <img src={imgSrc} alt="" className={styles.productImg} />
      </div>
    </a>
  );
};

const ProductCopy = (props: ProductBlockProps) => {
  const { productObj } = props;

  const MAX_TITLE_LENGTH = props.isMobile ? 100 : 120;
  let productTitle = productObj.title;
  if (productTitle.length > MAX_TITLE_LENGTH) {
    productTitle = productTitle.slice(0, MAX_TITLE_LENGTH - 3) + "...";
  }

  const productLink = productObj.linkUrl;

  const isPrime = productObj.isPrime;

  if (props.isMobile) {
    return (
      <a
        href={productLink}
        className="hiddenLink"
        target="_blank"
        onClick={() => props.onChoose(props.productObj)}
      >
        <div className={styles.productCopyContainer}>
          <h3 className={styles.productTitle}>{productTitle}</h3>
          <ProductRatings {...props} />
          <ProductPrice {...props} />
          {isPrime && (
            <img
              src="prime_logo.jpg"
              alt="prime"
              className={styles.primeLogo}
            />
          )}
        </div>
      </a>
    );
  }

  return (
    <div className={styles.productCopyContainer}>
      <h3 className={styles.productTitle}>
        <a
          href={productLink}
          className="hiddenLink"
          target="_blank"
          onClick={() => props.onChoose(props.productObj)}
        >
          {productTitle}
        </a>
      </h3>
      <ProductRatings {...props} />
      <a
        href={productLink}
        className="hiddenLink"
        target="_blank"
        onClick={() => props.onChoose(props.productObj)}
      >
        <ProductPrice {...props} />
      </a>
      {isPrime && (
        <img src="prime_logo.jpg" alt="prime" className={styles.primeLogo} />
      )}
    </div>
  );
};

const ProductPrice = (props: ProductBlockProps) => {
  const priceNum = props.productObj.price;
  if (!priceNum) return null;

  const priceStr = priceNum + "";
  const currencySymbol = props.productObj.currencySymbol;

  const priceComponentList = priceStr.split(".");
  const price1 = priceComponentList[0];
  let price2 = priceComponentList.length > 1 ? priceComponentList[1] : null;
  if (price2 && price2.length < 2) {
    price2 = price2 + "0";
  }

  return (
    <span className={styles.priceContainer}>
      {!!currencySymbol && (
        <span className={styles.priceSymbol}>{currencySymbol}</span>
      )}
      <span className={styles.price1}>{price1}</span>
      {!!price2 && <span className={styles.price2}>{price2}</span>}
    </span>
  );
};

const ProductRatings = (props: ProductBlockProps) => {
  const { rating, linkUrl: productLink } = props.productObj;
  if (!rating) return null;
  let reviewsCount = props.productObj.reviewsCount || 0;

  const reviewsLink = productLink + "#customerReviews";
  if (props.isMobile) {
    return (
      <div className={styles.ratingContainerMobile}>
        <span className={styles.ratingText}>{rating}</span>
        <StarRatings
          rating={rating}
          starDimension="16px"
          starSpacing="0px"
          starRatedColor="#FEA31C"
          ignoreInlineStyles={false}
        />
        <span className={styles.ratingCountText}>
          {"(" + reviewsCount + ")"}
        </span>
      </div>
    );
  }
  return (
    <div className={styles.ratingContainer}>
      <a href={reviewsLink} target="_blank" className="hiddenLink">
        <StarRatings
          rating={rating}
          starDimension="16px"
          starSpacing="0px"
          starRatedColor="#FEA31C"
          starEmptyColor="#D7D7D7"
          ignoreInlineStyles={false}
        />
        <span className={styles.ratingCountText}>{reviewsCount}</span>
      </a>
    </div>
  );
};
