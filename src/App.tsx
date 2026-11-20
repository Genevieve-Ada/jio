import React, { useMemo, useRef, useState } from 'react';
import {
  ALL_PRODUCTS,
  ARTISAN_CHAIR_PRODUCT,
  CategoryKey,
  ColorFamily,
  PRIMARY_PRODUCTS,
  Product,
  ProductSize,
  TOTAL_CATALOG_COUNT,
} from './data/products';
import { Header } from './components/Header';
import { FilterBar, PriceRange, SortOption } from './components/FilterBar';
import { ProductCard } from './components/ProductCard';
import { ArtisanBanner } from './components/ArtisanBanner';
import { Pagination } from './components/Pagination';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer, CartItem } from './components/CartDrawer';
import { EditorialSheet, EditorialTopic } from './components/EditorialSheet';

export function App() {
  const catalogTopRef = useRef<HTMLDivElement>(null);

  // Navigation & filter state
  const [activeCategory, setActiveCategory] = useState<CategoryKey>('All');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [colorFilter, setColorFilter] = useState<ColorFamily>('All');
  const [sizeFilter, setSizeFilter] = useState<ProductSize | 'All'>('All');
  const [priceRange, setPriceRange] = useState<PriceRange>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Selected finish swatch per product card
  const [selectedSwatches, setSelectedSwatches] = useState<Record<string, number>>({});

  // Interactive overlays
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [editorialTopic, setEditorialTopic] = useState<EditorialTopic>(null);

  const hasActiveFilters =
    activeCategory !== 'All' ||
    sortBy !== 'featured' ||
    colorFilter !== 'All' ||
    sizeFilter !== 'All' ||
    priceRange !== 'all' ||
    inStockOnly ||
    searchQuery.trim().length > 0;

  // Filtered product list (used whenever filters, category tabs, sort, or search are active)
  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    // Base curated set including the Artisan Wooden Chair for Furniture/search matches
    const pool = hasActiveFilters
      ? [...PRIMARY_PRODUCTS, ARTISAN_CHAIR_PRODUCT, ...ALL_PRODUCTS.filter((p) => p.page === 2)]
      : ALL_PRODUCTS.filter((p) => p.page === currentPage);

    const matches = pool.filter((item) => {
      if (activeCategory !== 'All' && item.category !== activeCategory) return false;
      if (colorFilter !== 'All' && item.colorFamily !== colorFilter) return false;
      if (sizeFilter !== 'All' && item.size !== sizeFilter) return false;
      if (inStockOnly && !item.inStock) return false;
      if (priceRange === 'under-35' && item.price >= 35) return false;
      if (priceRange === '35-65' && (item.price < 35 || item.price > 65)) return false;
      if (priceRange === 'over-65' && item.price <= 65) return false;
      if (query) {
        const haystack =
          `${item.name} ${item.descriptor} ${item.category} ${item.materials} ${item.colorFamily}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });

    const sorted = [...matches];
    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name-asc') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    }
    return sorted;
  }, [
    activeCategory,
    colorFilter,
    sizeFilter,
    priceRange,
    inStockOnly,
    searchQuery,
    sortBy,
    currentPage,
    hasActiveFilters,
  ]);

  const displayedResultCount = hasActiveFilters ? filteredProducts.length : TOTAL_CATALOG_COUNT;
  const totalPages = hasActiveFilters ? 1 : 5;

  const getSwatchIndex = (productId: string) => selectedSwatches[productId] ?? 0;

  const handleSelectSwatch = (productId: string, swatchIndex: number) => {
    setSelectedSwatches((prev) => ({ ...prev, [productId]: swatchIndex }));
  };

  const handleAddToCart = (product: Product, swatchIndex: number, quantity = 1) => {
    const key = `${product.id}__${swatchIndex}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { key, product, swatchIndex, quantity }];
    });
  };

  const handleUpdateQuantity = (key: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.key === key ? { ...item, quantity: item.quantity + delta } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveItem = (key: string) => {
    setCartItems((prev) => prev.filter((item) => item.key !== key));
  };

  const handleResetFilters = () => {
    setActiveCategory('All');
    setSortBy('featured');
    setColorFilter('All');
    setSizeFilter('All');
    setPriceRange('all');
    setInStockOnly(false);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const scrollToCatalog = () => {
    catalogTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategorySelect = (cat: CategoryKey, shouldScroll = false) => {
    setActiveCategory(cat);
    setCurrentPage(1);
    if (shouldScroll) {
      window.setTimeout(scrollToCatalog, 40);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    scrollToCatalog();
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Split the 10-item page showcase into exact asymmetric top bento (0..4) + bottom flipped bento (5..9)
  const showEditorialShowcase = !hasActiveFilters && filteredProducts.length === 10;
  const topLeftFour = showEditorialShowcase ? filteredProducts.slice(0, 4) : [];
  const topRightHero = showEditorialShowcase ? filteredProducts[4] : null;
  const bottomLeftHero = showEditorialShowcase ? filteredProducts[5] : null;
  const bottomRightFour = showEditorialShowcase ? filteredProducts.slice(6, 10) : [];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111111]">
      {/* Sticky Minimal Top Navigation Bar */}
      <Header
        cartCount={cartCount}
        searchQuery={searchQuery}
        searchOpen={searchOpen}
        onToggleSearch={() => setSearchOpen((prev) => !prev)}
        onSearchChange={(val) => {
          setSearchQuery(val);
          setCurrentPage(1);
        }}
        onOpenCart={() => setCartOpen(true)}
        onNavigateShop={() => {
          handleResetFilters();
          scrollToCatalog();
        }}
        onOpenAbout={() => setEditorialTopic('about')}
        onOpenInspiration={() => setEditorialTopic('inspiration')}
        onBrandClick={() => {
          handleResetFilters();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Catalog Showcase Container */}
      <main ref={catalogTopRef} className="flex-1 w-full max-w-[1320px] mx-auto px-5 sm:px-10 lg:px-14">
        <FilterBar
          activeCategory={activeCategory}
          onCategoryChange={(cat) => handleCategorySelect(cat, false)}
          sortBy={sortBy}
          onSortChange={setSortBy}
          colorFilter={colorFilter}
          onColorChange={setColorFilter}
          sizeFilter={sizeFilter}
          onSizeChange={setSizeFilter}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          inStockOnly={inStockOnly}
          onToggleInStock={() => setInStockOnly((prev) => !prev)}
          resultCount={displayedResultCount}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

        {/* Editorial Asymmetric Showcase Layout (Default Unfiltered View) */}
        {showEditorialShowcase && topRightHero && bottomLeftHero ? (
          <>
            {/* Top Asymmetric Bento: 2x2 Grid Left + Tall Featured Card Right */}
            <section aria-label="Featured home decor highlights">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7">
                  {topLeftFour.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant="standard"
                      selectedSwatchIndex={getSwatchIndex(product.id)}
                      onSelectSwatch={handleSelectSwatch}
                      onOpenProduct={setActiveProduct}
                      onQuickAdd={(p, idx) => handleAddToCart(p, idx, 1)}
                    />
                  ))}
                </div>

                <div className="h-full">
                  <ProductCard
                    product={topRightHero}
                    variant="featured"
                    selectedSwatchIndex={getSwatchIndex(topRightHero.id)}
                    onSelectSwatch={handleSelectSwatch}
                    onOpenProduct={setActiveProduct}
                    onQuickAdd={(p, idx) => handleAddToCart(p, idx, 1)}
                  />
                </div>
              </div>
            </section>

            {/* Full-Width Chartreuse Editorial Spotlight: Artisan Wooden Chair */}
            <ArtisanBanner onShopNow={(chair) => setActiveProduct(chair)} />

            {/* Bottom Flipped Asymmetric Bento: Tall Featured Card Left + 2x2 Grid Right */}
            <section aria-label="Handcrafted home decor collection">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-stretch">
                <div className="h-full">
                  <ProductCard
                    product={bottomLeftHero}
                    variant="featured"
                    selectedSwatchIndex={getSwatchIndex(bottomLeftHero.id)}
                    onSelectSwatch={handleSelectSwatch}
                    onOpenProduct={setActiveProduct}
                    onQuickAdd={(p, idx) => handleAddToCart(p, idx, 1)}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-7">
                  {bottomRightFour.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      variant="standard"
                      selectedSwatchIndex={getSwatchIndex(product.id)}
                      onSelectSwatch={handleSelectSwatch}
                      onOpenProduct={setActiveProduct}
                      onQuickAdd={(p, idx) => handleAddToCart(p, idx, 1)}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : filteredProducts.length > 0 ? (
          /* Filtered / Category / Search Uniform Editorial Grid */
          <section aria-label="Filtered products" className="pb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-9">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  variant="standard"
                  selectedSwatchIndex={getSwatchIndex(product.id)}
                  onSelectSwatch={handleSelectSwatch}
                  onOpenProduct={setActiveProduct}
                  onQuickAdd={(p, idx) => handleAddToCart(p, idx, 1)}
                />
              ))}
            </div>

            {/* Keep Artisan Spotlight accessible below Furniture or All filtered views */}
            {(activeCategory === 'Furniture' || activeCategory === 'All') && (
              <ArtisanBanner onShopNow={(chair) => setActiveProduct(chair)} />
            )}
          </section>
        ) : (
          /* Clean Empty Filter State */
          <section className="py-20 text-center border-t border-[#ECECEC] mb-14">
            <h2 className="font-serif text-[26px] text-[#111111]">
              No matching pieces found
            </h2>
            <p className="text-[13px] text-[#555555] mt-2 max-w-md mx-auto">
              Try adjusting your active category, price range, or search keyword to explore our full
              curated collection.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="mt-6 px-7 py-2.5 bg-[#111111] text-white text-[12px] hover:bg-[#431100] transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </section>
        )}

        {/* Pagination Bar */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </main>

      {/* Deep Mahogany Editorial Footer */}
      <Footer
        onSelectCategory={(cat) => handleCategorySelect(cat, true)}
        onFilterNewArrivals={() => {
          handleResetFilters();
          setSortBy('featured');
          scrollToCatalog();
        }}
        onFilterEcoFinds={() => {
          handleResetFilters();
          setInStockOnly(true);
          scrollToCatalog();
        }}
        onOpenStory={() => setEditorialTopic('about')}
        onOpenJournal={() => setEditorialTopic('inspiration')}
      />

      {/* Product Detail Modal */}
      <ProductModal
        product={activeProduct}
        initialSwatchIndex={activeProduct ? getSwatchIndex(activeProduct.id) : 0}
        onClose={() => setActiveProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Slide-Over Shopping Cart & Checkout Drawer */}
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
      />

      {/* About / Inspiration Editorial Sheet */}
      <EditorialSheet
        topic={editorialTopic}
        onClose={() => setEditorialTopic(null)}
        onExploreCategory={(cat) => handleCategorySelect(cat, true)}
      />
    </div>
  );
}

export default App;
