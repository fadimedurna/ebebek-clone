(async () => {
  // jQuery'yi yüklemek için yardımcı fonksiyon
  const loadScript = (url) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  // jQuery'yi yükle
  await loadScript("https://code.jquery.com/jquery-3.6.0.min.js");

  // INIT Başlangıç metodu
  const init = async () => {
    buildHTML();
    buildCSS();
    await fetchProducts();
    setEvents();
  };

  const buildHTML = () => {
    const html = `
     <header>
    <nav class="main-nav">
      <div class="nav-left">
        <img alt="ebebek logo" src="https://cdn05.e-bebek.com/y.ebebek/9973673459742.svg">
      </div>
      <ul class="nav-center">
        <li>Kategoriler</li>
        <li>Beğeniler</li>
        <li>Markalar</li>
        <li>İndirimdekiler</li>
        <li>İletişim</li>
      </ul>
      <div class="nav-right">
        <span>Giriş Yap</span>
        <span>Favorilerim</span>
      </div>
    </nav>
  </header>
    <main>
      <section class="after-stories">
        <img lazyloaded alt="orta-banner" src="https://cdn05.e-bebek.com/media/c/orta-banner-tum-akulu-araclar-scooter-ve-bisikletlerde-sepette-30-indirim-230d.jpg">
      </section>
      <section class="product-carousel">
        <div class="carousel-wrapper">
          <button class="prev">&#10094;</button>
          <h2>Beğenebileceğinizi Düşündüklerimiz</h2>
          <div class="carousel-container"></div>
          <button class="next">&#10095;</button>
        </div>
      </section>
    </main>
    <footer>
      <div class="footer-content">
        <div class="footer-section">
            <h3>Kurumsal</h3>
            <ul>
            <li>Hakkımızda</li>
            <li>Mağazalarımız</li>
            <li>İletişim</li>
            </ul>
        </div>
        <div class="footer-section">
            <h3>Yardım</h3>
            <ul>
            <li>Sıkça Sorulan Sorular</li>
            <li>Kargo ve Teslimat</li>
            <li>İade ve Değişim</li>
            </ul>
        </div>
        </div>
    </footer>
  `;
    $("body").html(html);
  };

  const buildCSS = () => {
    const css = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #fff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    header {
      background-color: #f8f8f8;
      padding: 10px 0;
    }

    .main-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
    }

    .nav-left img {
      height: 40px;
    }

    .nav-center {
      display: flex;
      list-style-type: none;
    }

    .nav-center li {
      margin: 0 15px;
      cursor: pointer;
    }

    .nav-right span {
      margin-left: 15px;
      cursor: pointer;
    }

    main {
      flex: 1;
      padding: 20px;
    }

    .after-stories {
      width: 90%;
      margin: 20px auto; 
      text-align: center; 
    }

    .after-stories img {
      width: 100%; 
      height: auto; 
      max-height: 300px; 
      object-fit: cover; 
      border-radius: 15px; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
    }
    
     .product-carousel {
      position: relative;
      padding: 20px 0;
      margin-bottom: 20px;
    }

    .carousel-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 20px;
      background-color: #f8f8f8;
      position: relative;
      border-radius: 10px;
    }

     .prev, .next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: #fff;
      border: 1px solid #ddd;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      font-size: 18px;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1;
      transition: all 0.2s ease;
    }

    .prev.clicked, .next.clicked {
      transform: translateY(-50%) scale(0.95);
      background-color: #f0f0f0;
    }

    .prev { left: 10px; }
    .next { right: 10px; }

    .carousel-wrapper h2 {
      font-size: 24px;
      margin: 10px 0;
      text-align: center;
      color: #333;
    }

     .carousel-container {
      display: flex;
      flex-direction: row;
      overflow-x: scroll;
      overflow-y: hidden;
      scrollbar-width: none;  /* Firefox için */
      -ms-overflow-style: none;  /* Internet Explorer ve Edge için */
      scroll-behavior: smooth;
      gap: 20px;
      padding: 10px 0;
      width: calc(100% - 100px);
    }

    .carousel-container::-webkit-scrollbar {
      display: none;  /* Chrome, Safari ve Opera için */
    }

    .carousel-item {
      flex: 0 0 auto;
      width: 250px;
      height: 450px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 10px;
      text-align: center;
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease; 
      border: 2px solid transparent; 
    }

    .carousel-item:hover {
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      border-color: #ff6600; 
    }

    .carousel-item img {
      width: 100%;
      height: 200px;
      object-fit: contain;
      margin-bottom: 10px;
    }

    .carousel-item h3 {
      font-size: 16px;
      line-height: 1.2;
      margin: 0 auto 20px;
      color:rgb(81, 86, 95);
      height: 60px;
      width: 70%;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      text-overflow: ellipsis;
      text-align: center;
    }

     .heart-button {
      position: absolute;
      z-index: 1;
      top: 10px;
      right: 10px;
      background: none;
      border: 1px solid transparent;
      font-size: 25px;
      color: #ddd;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    }

    .heart-button:hover {
      border-color: #ff6600;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .heart-button.active {
      color: #ff6600;
       box-shadow: 0 4px 8px rgba(255,102,0,0.3);
    }

    .price-container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 20px;
      padding: 5px;
      gap: 5px;
    }

    .original-price {
      font-size: 16px;
      color: #999;
      text-decoration: line-through;
      margin-bottom: 2px;
    }

    .price {
      font-size: 20px;
      font-weight: bold;
      color: #ff6600;
      margin-bottom: 2px;
    }

    .discount {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
      background-color: #ff6600;
      padding: 2px 4px;
      border-radius: 4px;
      display: inline-block;
    }

    
    footer {
      background-color: #333;
      color: #fff;
      padding: 20px;
    }

    .footer-content {
      display: flex;
      justify-content: space-around;
    }

    .footer-section h3 {
      margin-bottom: 10px;
    }

    .footer-section ul {
      list-style-type: none;
    }

    .footer-section ul li {
      margin-bottom: 5px;
      cursor: pointer;
    }
  `;

    $("<style>").text(css).appendTo("head");
  };

  //fetch products from API
  const fetchProducts = () => {
    // Önce localStorage'dan ürünleri kontrol et
    const cachedProducts = localStorage.getItem("cachedProducts");

    if (cachedProducts) {
      console.log("Products fetched from localStorage");
      const products = JSON.parse(cachedProducts);
      renderProducts(products);
      return Promise.resolve(products);
    }

    // Eğer localStorage'da yoksa, API'den fetch et
    console.log("Fetching products from API");
    return fetch(
      "https://gist.githubusercontent.com/sevindi/8bcbde9f02c1d4abe112809c974e1f49/raw/9bf93b58df623a9b16f1db721cd0a7a539296cf0/products.json",
      {
        method: "GET",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Ürünleri localStorage'a kaydet
        localStorage.setItem("cachedProducts", JSON.stringify(data));
        renderProducts(data);
        return data;
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        throw error;
      });
  };

  //product rendering
  const renderProducts = (products) => {
    const carouselContainer = $(".carousel-container");
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    products.forEach((product) => {
      let priceHtml = `<p class="price">${product.price} TL</p>`;

      if (product.price !== product.original_price) {
        const discountPercentage = Math.round(
          (1 - product.price / product.original_price) * 100
        );
        priceHtml = `
        <p class="original-price">${product.original_price} TL</p>
        <p class="price">${product.price} TL</p>
        <p class="discount">%${discountPercentage}</p>
      `;
      }

      const isFavorite = favorites.includes(product.id);
      const heartClass = isFavorite ? "active" : "";

      const productElement = `
      <div class="carousel-item" data-url="${product.url}" data-id="${product.id}">
        <button class="heart-button ${heartClass}">❤</button>
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <div class="price-container">
          ${priceHtml}
        </div>
      </div>
    `;
      carouselContainer.append(productElement);
    });
  };

  const setEvents = () => {
    //pathname kısmını kendi .html dosyanıza göre düzenleyin
    if ($(location).attr("pathname") !== "/test.html") {
      console.log("wrong page");
      return;
    }

    const container = $(".carousel-container");
    const itemWidth = $(".carousel-item").outerWidth(true);
    const gap = parseInt($(".carousel-container").css("gap")) || 0;

    const scrollOneItem = (direction) => {
      const scrollAmount =
        container.scrollLeft() + direction * (itemWidth + gap);
      container.animate({ scrollLeft: scrollAmount }, 10);
    };

    $(".prev, .next").on("click", function () {
      const $this = $(this);
      $this.addClass("clicked");
      setTimeout(() => $this.removeClass("clicked"), 50);

      if ($this.hasClass("prev")) {
        scrollOneItem(-1);
      } else {
        scrollOneItem(1);
      }
    });

    $(".carousel-container").on("click", (event) => {
      const target = $(event.target);

      if (target.hasClass("heart-button")) {
        event.preventDefault();
        event.stopPropagation();

        const productId = target.closest(".carousel-item").data("id");
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        if (target.hasClass("active")) {
          // Remove from favorites
          favorites = favorites.filter((id) => id !== productId);
          target.removeClass("active");
        } else {
          // Add to favorites
          favorites.push(productId);
          target.addClass("active");
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else if (target.closest(".carousel-item").length) {
        event.preventDefault();
        const url = target.closest(".carousel-item").data("url");
        if (url) window.open(url, "_blank");
      }
    });
  };

  await init();
})();
