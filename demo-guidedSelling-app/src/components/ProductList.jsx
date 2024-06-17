import React, { useEffect, useState } from 'react';
import '../scss/productList.scss';
import dummyData from '../assets/data/database.json';

// Dynamisch alle afbeeldingen importeren
const images = import.meta.glob('../assets/img/*.jpg');

const ProductList = ({ recommendedProducts, resetRecommendedProducts }) => {
  const [products, setProducts] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    const allProducts = dummyData.collections.flatMap(collection => collection.products);
    setProducts(allProducts);

    // Laad alle afbeeldingen
    const loadImages = async () => {
      const imageKeys = Object.keys(images);
      const loadedImages = await Promise.all(
        imageKeys.map(async (key) => {
          const mod = await images[key]();
          return [key.replace('../assets/img/', ''), mod.default];
        })
      );
      setLoadedImages(Object.fromEntries(loadedImages));
    };

    loadImages();
  }, []);

  // Sort function to maintain the order of recommendedProducts
  const sortProducts = (products, recommendedProducts) => {
    const productMap = new Map(products.map(product => [product.id, product]));
    return recommendedProducts.map(id => productMap.get(id)).filter(Boolean);
  };

  const filteredProducts = recommendedProducts.length > 0
    ? sortProducts(products, recommendedProducts)
    : products;

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="product-list">
      <div className="product-list-info">
        <div className="total-products">{filteredProducts.length} products</div>
        <button className="delete-prompt-btn" onClick={resetRecommendedProducts}>delete prompt</button>
      </div>
      <div className="product-grid">
        {currentProducts.map((product) => {
          const imageSrc = loadedImages[product.image] || '';
          const productColors = product.colors || [];

          return (
            <div key={product.id} className="product-item">
              {imageSrc && <img src={imageSrc} alt={product.title} className="product-image" />}
              <div className="product-info">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <p>{product.price.currency} {product.price.amount}</p>
                <p>{product.size}</p>
                <div className="product-colors">
                  {productColors.map((color, index) => (
                    <div
                      key={index}
                      className="product-color"
                      style={{ backgroundColor: `rgba(${color.rgba.join(',')})` }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredProducts.length / productsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
