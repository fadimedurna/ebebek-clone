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

  // Ana sayfa kontrolü
  // Ana sayfa URL'ini buraya girin
  const isHomePage = () => {
    return $(location).attr("pathname") === "/test.html";
  };

  // INIT Başlangıç metodu
  const init = async () => {
    if (isHomePage()) {
      buildHTML();
      buildCSS();
      await fetchProducts();
      setEvents();
    } else {
      console.log("wrong page");
    }
  };

  const buildHTML = () => {
    const html = `
     <header>
    <nav class="main-nav">
      <div class="nav-left">
        <img alt="ebebek logo" src="https://cdn05.e-bebek.com/y.ebebek/9973673459742.svg">
      </div>
      <button class="menu-toggle" id="menuToggle">&#9776;</button>
      <div class="menu-content">
        <ul class="nav-center">
          <li class="nav-li" data-url="https://example.com/kategoriler">Kategoriler</li>
          <li class="nav-li" data-url="https://example.com/begeniler">Beğeniler</li>
          <li class="nav-li" data-url="https://example.com/markalar">Markalar</li>
          <li class="nav-li" data-url="https://example.com/indirimdekiler">İndirimdekiler</li>
          <li class="nav-li" data-url="https://example.com/iletisim">İletişim</li>
        </ul>
        <div class="nav-right">
          <span>Giriş Yap</span>
          <span>Favorilerim</span>
        </div>
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
      flex-wrap: wrap;
      align-items: center;
      padding: 0 20px;
    }

    .nav-left img {
      height: 40px;
      max-width: 100%;
    }

    .menu-toggle {
      display: none;
      background: none;
    }

    .menu-content {
      display: flex;
      flex-grow: 1;
      justify-content: space-between;
      align-items: center;
    }

    .nav-center {
      display: flex;
      flex-wrap: wrap;
      list-style-type: none;
      justify-content: center;
      margin: 10px 0;
      flex-grow: 1;
    }

    .nav-center li {
      margin: 5px 15px;
      cursor: pointer;
    }

    .nav-right {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      margin-left: auto;
    }

    .nav-right span {
      margin: 5px 15px;
      cursor: pointer;
    }

    main {
      flex: 1;
      padding: 20px;
    }

    .after-stories {
      width: 100%;
      max-width: 1100px;
      margin: 20px auto; 
      text-align: center; 
    }

    .after-stories img {
      width: 100%; 
      height: auto; 
      max-height: 300px; 
      object-fit: cover; 
      border-radius: 30px; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.1); 
    }
    
    .product-carousel {
      position: relative;
      padding: 20px 0;
      margin-bottom: 20px;
      width: 90%; 
      max-width: 1100px; 
      margin-left: auto;
      margin-right: auto;
    }

    .carousel-wrapper {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0 30px; 
      background-color: #f8f8f8;
      position: relative;
      border-radius: 30px;
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

    .prev { left: -30px; }
    .next { right: -30px; }

    .carousel-wrapper h2 {
      font-size: 24px;
      margin: 10px 0;
      text-align: center;
      color: #333;
    }

    .carousel-container {
      display: flex;
      flex-direction: row;
      overflow-x: auto;
      overflow-y: hidden;
      scrollbar-width: none;
      -ms-overflow-style: none;
      scroll-behavior: smooth;
      gap: 15px; 
      padding: 10px 0;
      width: 100%;
    }

    .carousel-container::-webkit-scrollbar {
      display: none;
    }

    .carousel-item {
      flex: 0 0 auto;
      width: calc(25% - 11.25px); /* Gap değişikliğine göre */
      max-width: 230px; 
      min-width: 180px; 
      height: auto;
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
      color: rgb(81, 86, 95);
      height: 60px;
      width: 100%;
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
      flex-wrap: wrap;
      justify-content: space-around;
    }

    .footer-section {
      margin-bottom: 20px;
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

    @media (max-width: 1024px) {
      .main-nav {
        flex-direction: column;
        align-items: center;
      }
        
      .menu-content {
        flex-direction: column;
        align-items: center;
      }

      .nav-right {
        margin-left: 0;
        justify-content: center;
      }
        
      .carousel-item {
        width: calc(33.33% - 10px);
      }
    }

     @media (max-width: 768px) {
      .main-nav {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      
      .nav-left {
        order: 1;
      }

      .menu-toggle {
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 10px;
        display: block;
        order: 2;
        z-index: 1001;
      }

      .nav-center, .nav-right {
        top: 0;
        right: -250px;
        flex-direction: column;
        align-items: flex-start;
        transition: right 0.3s ease-in-out;
        z-index: 1000;
        display: flex;
      }

      .nav-center.active, .nav-right.active {
        right: 0;
      }

      .menu-content {
        position: fixed;
        top: 0;
        right: -250px;
        width: 250px;
        height: 100vh;
        background-color: #f8f8f8;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 60px 20px 20px;
        transition: right 0.3s ease-in-out;
        z-index: 1000;
      }

      .menu-content.active {
        right: 0;
      }

      .menu-content .nav-center,
      .menu-content .nav-right {
        position: static;
        width: 100%;
        height: auto;
        background-color: transparent;
        box-shadow: none;
        padding: 0;
      }

      .menu-content .nav-center {
        order: 1;
        margin-bottom: 20px;
      }

      .menu-content .nav-right {
        order: 2;
      }

      .menu-content .nav-center li,
      .menu-content .nav-right span {
        margin: 10px 0;
        width: 100%;
        text-align: left;
      }

      .menu-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
        z-index: 999;
      }

      body.menu-open {
        overflow: hidden;
      }

      .carousel-item {
        width: calc(50% - 7.5px);
      }

      .product-carousel {
        width: 95%; 
      }

      .prev, .next {
        width: 30px;
        height: 30px;
        font-size: 14px;
      }

      .prev { left: -15px; }
      .next { right: -15px; }
    }

    @media (max-width: 480px) {

      .product-carousel {
        width: 100%;
      }

      .prev { left: -10px; }
      .next { right: -10px; }

      .carousel-item {
        width: 100%;
        margin: 0 auto;
      }

      .carousel-item h3 {
        font-size: 14px;
      }

      .price {
        font-size: 16px;
      }

      .original-price, .discount {
        font-size: 12px;
      }
    }
  `;

    $("<style>").text(css).appendTo("head");
  };

  //API'dan productları çekiyoruz
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

  //Productları render ediyoruz
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
    if (!isHomePage()) {
      return; // Ana sayfa değilse, event'leri set etme
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
          //Favoriden çıkarma
          favorites = favorites.filter((id) => id !== productId);
          target.removeClass("active");
        } else {
          // Favorilere ekleme
          favorites.push(productId);
          target.addClass("active");
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else if (target.closest(".carousel-item").length) {
        event.preventDefault();
        const url = target.closest(".carousel-item").data("url");
        if (url) window.open(url, "_blank");
        console.log("wrong page");
      }
    });

    $("#menuToggle").on("click", function () {
      $("body").toggleClass("menu-open");

      if (!$(".menu-content").hasClass("active")) {
        $("<div class='menu-backdrop'></div>").appendTo("body");

        setTimeout(() => {
          $(".menu-content").addClass("active");
        }, 10);
      } else {
        $(".menu-content").removeClass("active");
        $(".menu-backdrop").remove();
      }
    });

    $(document).on("click", ".menu-backdrop", function () {
      $(".menu-content").removeClass("active");
      $("body").removeClass("menu-open");
      $(this).remove();
    });

    $(".nav-li").on("click", function (event) {
      event.preventDefault();
      const url = $(this).data("url");
      window.open(url, "_blank");
      console.log("wrong page");
    });
  };

  await init();
})();
