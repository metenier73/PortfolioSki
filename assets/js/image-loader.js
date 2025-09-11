// Image loader pour le chargement optimisé des images
class ImageLoader {
  constructor() {
    this.observer = null;
    this.initLazyLoading();
  }

  // Initialise le lazy loading avec l'Intersection Observer
  initLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            this.loadImage(img);
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '200px',
        threshold: 0.01
      });
    }
  }

  // Charge une image de manière asynchrone
  loadImage(img) {
    // Si l'image a déjà été chargée, on ne fait rien
    if (img.dataset.loaded === 'true') return;

    // Récupère les sources de l'image
    const src = img.dataset.src;
    const srcset = img.dataset.srcset;
    const sizes = img.dataset.sizes;

    // Crée une nouvelle image pour le préchargement
    const tempImg = new Image();
    
    // Quand l'image est chargée, on l'affiche
    tempImg.onload = () => {
      if (src) img.src = src;
      if (srcset) img.srcset = srcset;
      if (sizes) img.sizes = sizes;
      img.classList.add('loaded');
      img.dataset.loaded = 'true';
      
      // Déclenche un événement personnalisé quand l'image est chargée
      const event = new CustomEvent('imageLoaded', { detail: { target: img } });
      document.dispatchEvent(event);
    };

    // En cas d'erreur
    tempImg.onerror = () => {
      console.error(`Erreur lors du chargement de l'image: ${src}`);
      img.classList.add('error');
    };

    // Démarre le chargement
    if (srcset) {
      tempImg.srcset = srcset;
      tempImg.sizes = sizes || '100vw';
    } else {
      tempImg.src = src;
    }
  }

  // Observe une image pour le lazy loading
  observeImage(img) {
    if (this.observer) {
      this.observer.observe(img);
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'Intersection Observer
      this.loadImage(img);
    }
  }

  // Crée un élément picture avec des sources multiples
  createPictureElement(config) {
    const picture = document.createElement('picture');
    
    // Ajoute les sources WebP
    if (config.sources && config.sources.webp) {
      const webpSource = document.createElement('source');
      webpSource.type = 'image/webp';
      webpSource.srcset = config.sources.webp.srcset;
      if (config.sources.webp.sizes) {
        webpSource.sizes = config.sources.webp.sizes;
      }
      picture.appendChild(webpSource);
    }

    // Ajoute les sources par défaut
    if (config.sources && config.sources.default) {
      const defaultSource = document.createElement('source');
      defaultSource.srcset = config.sources.default.srcset;
      if (config.sources.default.sizes) {
        defaultSource.sizes = config.sources.default.sizes;
      }
      picture.appendChild(defaultSource);
    }

    // Crée l'élément img
    const img = document.createElement('img');
    img.src = config.fallback;
    img.alt = config.alt || '';
    img.loading = config.loading || 'lazy';
    
    if (config.className) {
      img.className = config.className;
    }
    
    picture.appendChild(img);
    return picture;
  }
}

// Initialise le chargeur d'images
document.addEventListener('DOMContentLoaded', () => {
  const imageLoader = new ImageLoader();
  
  // Observe toutes les images avec data-src
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageLoader.observeImage(img);
  });
  
  // Expose l'instance pour une utilisation avancée
  window.imageLoader = imageLoader;
});
