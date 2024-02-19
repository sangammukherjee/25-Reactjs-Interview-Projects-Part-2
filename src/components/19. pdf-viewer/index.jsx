import {
  Document,
  PDFDownloadLink,
  PDFViewer,
  Page,
  Text,
  View,
} from "@react-pdf/renderer";
import { useEffect, useState } from "react";
import './pdf.css'

function PdfViewComponent({ productDetails }) {
  return (
    <Document>
      <Page>
        <View>
          <Text>{productDetails?.title}</Text>
          <Text>{productDetails?.description}</Text>
          <Text>{productDetails?.category}</Text>
        </View>
      </Page>
    </Document>
  );
}

function PdfViewer() {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState(null);

  async function fetchListOfProducts() {
    const apiResponse = await fetch(
      "https://dummyjson.com/products?limit=10&skip=0"
    );
    const result = await apiResponse.json();

    if (result && result.products && result.products.length) {
      setProducts(result.products);
    }
  }

  useEffect(() => {
    fetchListOfProducts();
  }, []);

  async function handleFetchProductDetails(getId) {
    const apiResponse = await fetch(`https://dummyjson.com/products/${getId}`);
    const result = await apiResponse.json();

    if (result) setProductDetails(result);
  }

  console.log(productDetails);
  return (
    <div className="pdf-viewer-container">
      <h1>PDF Viewer</h1>
      <ul>
        {products && products.length > 0
          ? products.map((productItem) => (
              <li
                onClick={() => handleFetchProductDetails(productItem.id)}
                key={productItem.id}
              >
                {productItem.title}
              </li>
            ))
          : null}
      </ul>
      <div className="pdf-viewer-page">
        <PDFViewer style={{ width: "100%", height: "800px" }}>
          <PdfViewComponent productDetails={productDetails} />
        </PDFViewer>
      </div>
      <PDFDownloadLink
        fileName="Product-Details.pdf"
        document={<PdfViewComponent productDetails={productDetails} />}
      >
        <button>Download PDF</button>
      </PDFDownloadLink>
    </div>
  );
}

export default PdfViewer;
