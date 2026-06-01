import os
import re
import json

root = os.path.dirname(os.path.abspath(__file__))
domain = "https://artisticworks7.com"

page_metadata = {
    "index.html": {
        "title": "Art Workshops & Handmade Art in Bangalore | Artistic Works 7",
        "description": "Artistic Works 7 in Bangalore offers premium art workshops, handcrafted gifts, terracotta and painting experiences for private groups, corporate sessions and personalized gifting.",
        "og_image": "/images/hero/hero-banner.png",
    },
    "workshops.html": {
        "title": "Creative Art Workshops in Bangalore | Painting, Terracotta & Group Experiences",
        "description": "Book Bangalore painting, terracotta and creative group workshops with Artistic Works 7. Beginner-friendly sessions, private events and custom art experiences for every occasion.",
        "og_image": "/images/workshops/painting-workshop.jpeg",
    },
    "shop.html": {
        "title": "Handmade Art, Paintings & Terracotta Décor | Artistic Works 7",
        "description": "Discover handmade paintings, terracotta decor and curated gift collections from Artistic Works 7 Bangalore. Perfect for personalized gifting, home styling and commissioned artwork.",
        "og_image": "/images/shop/paintings.jpg",
    },
    "gift.html": {
        "title": "Personalized Handmade Gifts in Bangalore | Artistic Works 7",
        "description": "Shop bespoke handmade gifts in Bangalore by Artistic Works 7. Personalized art, creative gift experiences and premium curated keepsakes for birthdays, weddings and special occasions.",
        "og_image": "/images/gift/personalized-artwork.jpg",
    },
    "experiences.html": {
        "title": "Private Creative Experiences & Art Events | Artistic Works 7",
        "description": "Choose private creative experiences and art events in Bangalore with Artistic Works 7. Creative workshops, live painting and corporate sessions designed for meaningful celebrations.",
        "og_image": "/images/experiences/private.jpeg",
    },
    "about.html": {
        "title": "About Artistic Works 7 | Handmade Art & Workshops in Bangalore",
        "description": "Learn about Artistic Works 7, a Bangalore studio for handmade art, workshops, terracotta craft and bespoke creative experiences that celebrate local creativity.",
        "og_image": "/images/logo/logo-icon.jpeg",
    },
    "contact.html": {
        "title": "Contact Artistic Works 7 | Bangalore Art Studio",
        "description": "Contact Artistic Works 7 for Bangalore art workshops, personalized gifts, commissioned artwork and WhatsApp enquiries. Quick responses for bookings and creative collaborations.",
        "og_image": "/images/logo/logo-icon.jpeg",
    },
    "gallery.html": {
        "title": "Gallery of Handmade Art & Workshop Creations | Artistic Works 7",
        "description": "Browse the Artistic Works 7 gallery for handmade art, workshop creations and personalized commissions created in Bangalore. Inspired art for home decor and gifting.",
        "og_image": "/images/gallery/gallery-1.jpeg",
    },
    "reviews.html": {
        "title": "Reviews of Art Workshops & Handmade Gifts Bangalore | Artistic Works 7",
        "description": "Read reviews of Bangalore art workshops, handmade gift collections and private creative experiences from Artistic Works 7. Trusted, premium creative support for groups and individuals.",
        "og_image": "/images/workshops/painting-workshop.jpeg",
    },
    "faq.html": {
        "title": "FAQs – Art Workshops, Handmade Gifts & Bangalore Creative Experiences",
        "description": "Find answers about Bangalore art workshops, personalized gifts, terracotta sessions and private creative experiences at Artistic Works 7. Helpful booking and workshop details.",
        "og_image": "/images/hero/hero-banner.png",
    },
}

location_pages = {
    "cubbon-park.html": "Workshops in Cubbon Park | Artistic Works 7",
    "indiranagar.html": "Workshops in Indiranagar | Artistic Works 7",
    "hsr-layout.html": "Workshops in HSR Layout | Artistic Works 7",
    "jayanagar.html": "Workshops in Jayanagar | Artistic Works 7",
    "malleshwaram.html": "Workshops in Malleshwaram | Artistic Works 7",
    "rajajinagar.html": "Workshops in Rajajinagar | Artistic Works 7",
    "whitefield.html": "Workshops in Whitefield | Artistic Works 7",
    "yeshwanthpur.html": "Workshops in Yeshwanthpur | Artistic Works 7",
}

improved_alts = {
    "Painting": "Painting workshop in Bangalore by Artistic Works 7",
    "Kids art": "Kids art workshop in Bangalore by Artistic Works 7",
    "Terracotta": "Terracotta workshop in Bangalore by Artistic Works 7",
    "Crochet": "Crochet craft workshop in Bangalore by Artistic Works 7",
    "Painting workshop": "Painting workshop in Bangalore by Artistic Works 7",
    "Customized Art": "Customized art workshop in Bangalore by Artistic Works 7",
    "Wedding Live Painting": "Wedding live painting experience by Artistic Works 7 Bangalore",
    "Online Workshops": "Online art workshops from Artistic Works 7",
    "Handmade Paintings": "Handmade paintings by Artistic Works 7 Bangalore",
    "Customized handmade craft review moment": "Review of customized handmade craft by Artistic Works 7 Bangalore",
}


def build_jsonld(page_name, page_url):
    base = {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "LocalBusiness",
                "@id": f"{domain}/#localbusiness",
                "name": "Artistic Works 7",
                "url": domain,
                "logo": f"{domain}/images/logo/logo-icon.jpeg",
                "image": f"{domain}/images/hero/hero-banner.png",
                "description": "Artistic Works 7 is a Bangalore studio for premium art workshops, handmade gifts, terracotta craft and bespoke creative experiences.",
                "telephone": "+91 9449237357",
                "email": "artisticworks37@gmail.com",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "22, 1st Main Road, Veerabhadrappa Layout, Bhavani Nagar, 5th Stage, Chikkabidarakallu, Thirumalapura",
                    "addressLocality": "Bengaluru",
                    "addressRegion": "Karnataka",
                    "postalCode": "560073",
                    "addressCountry": "IN",
                },
                "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 12.9750,
                    "longitude": 77.5938,
                },
                "areaServed": [
                    "Bangalore",
                    "Indiranagar",
                    "Koramangala",
                    "Rajajinagar",
                    "Malleshwaram",
                    "Yeshwanthpur",
                    "Hebbal",
                    "Hesaraghatta",
                    "Peenya",
                    "Jalahalli",
                    "Bangalore Urban",
                ],
                "priceRange": "₹₹",
                "openingHoursSpecification": [
                    {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": [
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday"
                        ],
                        "opens": "10:00",
                        "closes": "20:00"
                    }
                ]
            },
            {
                "@type": "Organization",
                "@id": f"{domain}/#organization",
                "name": "Artistic Works 7",
                "url": domain,
                "logo": f"{domain}/images/logo/logo-icon.jpeg",
                "sameAs": [
                    "https://www.instagram.com/",
                    "https://www.facebook.com/",
                    "https://wa.me/919449237357"
                ]
            },
            {
                "@type": "WebSite",
                "@id": f"{domain}/#website",
                "url": domain,
                "name": "Artistic Works 7",
                "publisher": {
                    "@id": f"{domain}/#organization"
                }
            },
            {
                "@type": "BreadcrumbList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Home",
                        "item": domain
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": page_name,
                        "item": f"{domain}{page_url}"
                    }
                ]
            }
        ]
    }

    if page_name == "Workshops":
        base["@graph"].append({
            "@type": "Event",
            "name": "Bangalore Art Workshops",
            "startDate": "2026-06-01",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "eventStatus": "https://schema.org/EventScheduled",
            "location": {
                "@type": "Place",
                "name": "Artistic Works 7 Workshop Studio",
                "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "22, 1st Main Road, Veerabhadrappa Layout, Bhavani Nagar, 5th Stage, Chikkabidarakallu",
                    "addressLocality": "Bengaluru",
                    "addressRegion": "Karnataka",
                    "postalCode": "560073",
                    "addressCountry": "IN"
                }
            },
            "description": "Artistic Works 7 workshops include painting, terracotta, crochet, kids art and private creative experiences in Bangalore.",
            "offers": {
                "@type": "Offer",
                "url": f"{domain}/workshops.html",
                "priceCurrency": "INR",
                "availability": "https://schema.org/InStock"
            }
        })
    if page_name == "Shop":
        base["@graph"].append({
            "@type": "ItemList",
            "name": "Handmade Art & Gift Collection",
            "itemListElement": [
                {
                    "@type": "Product",
                    "name": "Handmade Paintings",
                    "description": "Premium handmade paintings for home decor and gifting.",
                    "image": f"{domain}/images/shop/paintings.jpg",
                    "brand": "Artistic Works 7",
                    "offers": {
                        "@type": "Offer",
                        "priceCurrency": "INR",
                        "availability": "https://schema.org/InStock"
                    }
                },
                {
                    "@type": "Product",
                    "name": "Terracotta Décor",
                    "description": "Handcrafted terracotta decor pieces for Bangalore homes.",
                    "image": f"{domain}/images/shop/terracotta-products.jpeg",
                    "brand": "Artistic Works 7"
                }
            ]
        })
    if page_name == "Gallery":
        base["@graph"].append({
            "@type": "ArtGallery",
            "name": "Artistic Works 7 Gallery",
            "description": "Gallery of handmade art, workshop creations and commissioned pieces from Bangalore.",
            "image": f"{domain}/images/gallery/gallery-1.jpeg",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "22, 1st Main Road, Veerabhadrappa Layout, Bhavani Nagar, 5th Stage, Chikkabidarakallu",
                "addressLocality": "Bengaluru",
                "addressRegion": "Karnataka",
                "postalCode": "560073",
                "addressCountry": "IN"
            }
        })
    if page_name == "FAQ":
        base["@graph"].append({
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Which are the best art workshops in Bangalore?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Artistic Works 7 offers premium Bangalore art workshops for painting, terracotta, kids art, corporate sessions and private group experiences."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where can I attend terracotta workshops in Bangalore?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "You can attend terracotta workshops in Bangalore with Artistic Works 7, where curated clay sessions are available for beginners and groups."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where can I get personalized handmade gifts in Bangalore?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Artistic Works 7 creates personalized handmade gifts in Bangalore, including custom artwork, terracotta décor and thoughtful gift sessions."
                    }
                },
                {
                    "@type": "Question",
                    "name": "What are beginner-friendly art workshops in Bangalore?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Our beginner-friendly workshops in Bangalore welcome new makers with guided support, premium materials and a calm creative pace."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Where can I book private art experiences in Bangalore?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Book private art experiences in Bangalore with Artistic Works 7 for birthdays, corporate sessions, couple dates and curated creative events."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Can I commission custom artwork in Bangalore?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Artistic Works 7 accepts commissioned artwork enquiries in Bangalore, creating bespoke paintings and handmade décor tailored to your brief."
                    }
                }
            ]
        })
    return json.dumps(base, indent=2)


def build_head(metadata, url_path, page_name, stylesheet_href):
    canonical = f"{domain}{url_path}"
    description = metadata["description"]
    image = metadata["og_image"]
    title = metadata["title"]
    og_image_alt = f"{title}"
    lines = [
        "    <meta charset=\"UTF-8\">",
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
        f"    <title>{title}</title>",
        f"    <meta name=\"description\" content=\"{description}\">",
        "    <meta name=\"robots\" content=\"index, follow\">",
        "    <meta name=\"author\" content=\"Artistic Works 7\">",
        "    <meta name=\"geo.placename\" content=\"Bengaluru\">",
        "    <meta name=\"geo.region\" content=\"IN-KA\">",
        "    <meta name=\"geo.position\" content=\"12.9750;77.5938\">",
        f"    <link rel=\"canonical\" href=\"{canonical}\">",
        "    <link rel=\"icon\" href=\"/images/logo/logo-icon.jpeg\">",
        "    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">",
        "    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>",
        "    <link href=\"https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@300;400;500;600&display=swap\" rel=\"stylesheet\">",
        f"    <link rel=\"stylesheet\" href=\"{stylesheet_href}\">",
        "    <!-- Add Google Search Console verification meta tag when ready -->",
        "    <!-- Example: <meta name=\"google-site-verification\" content=\"your-code-here\"> -->",
        "    <!-- Add Google Analytics / GA4 tag when ready -->",
        "    <!-- Add Google Tag Manager snippet when ready -->",
        f"    <meta property=\"og:title\" content=\"{title}\">",
        f"    <meta property=\"og:description\" content=\"{description}\">",
        f"    <meta property=\"og:type\" content=\"website\">",
        f"    <meta property=\"og:url\" content=\"{canonical}\">",
        f"    <meta property=\"og:image\" content=\"{domain}{image}\">",
        f"    <meta property=\"og:image:alt\" content=\"{og_image_alt}\">",
        f"    <meta name=\"twitter:card\" content=\"summary_large_image\">",
        f"    <meta name=\"twitter:title\" content=\"{title}\">",
        f"    <meta name=\"twitter:description\" content=\"{description}\">",
        f"    <meta name=\"twitter:image\" content=\"{domain}{image}\">",
        "    <meta name=\"theme-color\" content=\"#ffffff\">",
    ]
    lines.append(f"    <script type=\"application/ld+json\">{build_jsonld(page_name, url_path)}</script>")
    return "<head>\n" + "\n".join(lines) + "\n</head>\n"


def process_file(path, root):
    rel = os.path.relpath(path, root).replace('\\', '/')
    metadata = {}
    page_name = None
    url_path = '/' + rel if rel != 'index.html' else '/'
    filename = os.path.basename(path)
    if filename in page_metadata:
        metadata = page_metadata[filename]
        page_name = {
            "index.html": "Home",
            "workshops.html": "Workshops",
            "shop.html": "Shop",
            "gift.html": "Gift",
            "experiences.html": "Experiences",
            "about.html": "About",
            "contact.html": "Contact",
            "gallery.html": "Gallery",
            "reviews.html": "Reviews",
            "faq.html": "FAQ",
        }[filename]
    elif rel.startswith('locations/'):
        location_file = os.path.basename(rel)
        title = location_pages.get(location_file, os.path.splitext(location_file)[0])
        metadata = {
            "title": title,
            "description": f"Book creative Bangalore workshops in {title.split(' in ')[-1].replace(' | Artistic Works 7','')} with Artistic Works 7. Premium painting, terracotta and group art experiences near you.",
            "og_image": "/images/workshops/painting-workshop.jpeg",
        }
        page_name = title.split(' | ')[0]
    else:
        return

    with open(path, 'r', encoding='utf-8') as f:
        text = f.read()

    stylesheet_href = "css/style.css" if not rel.startswith('locations/') else "../css/style.css"

    # Replace head
    new_head = build_head(metadata, url_path, page_name, stylesheet_href)
    text = re.sub(r'<head>.*?</head>', lambda match: new_head, text, flags=re.S)

    # Add loading lazy to images not already lazy, skip logo and hero banner images
    def img_replace(match):
        tag = match.group(0)
        if 'loading=' in tag or 'navbar-logo-img' in tag or 'class="banner-image"' in tag or 'class=\'banner-image\'' in tag:
            return tag
        if tag.endswith('/>'):
            return tag.replace('<img', '<img loading="lazy"', 1)
        return tag.replace('<img', '<img loading="lazy"', 1)

    text = re.sub(r'<img\b[^>]*>', img_replace, text)

    # Improve select alt text
    for old, new in improved_alts.items():
        text = re.sub(rf'(?<=alt=")({re.escape(old)})(?=")', new, text)

    with open(path, 'w', encoding='utf-8') as f:
        f.write(text)


pages = [
    'index.html', 'workshops.html', 'shop.html', 'gift.html', 'experiences.html', 'about.html',
    'contact.html', 'gallery.html', 'reviews.html', 'faq.html'
]

for page in pages:
    process_file(os.path.join(root, page), root)

locations_dir = os.path.join(root, 'locations')
if os.path.isdir(locations_dir):
    for fname in os.listdir(locations_dir):
        if fname.endswith('.html'):
            process_file(os.path.join(locations_dir, fname), root)

# Generate sitemap.xml
sitemap_path = os.path.join(root, 'sitemap.xml')
all_urls = [
    '/',
    '/workshops.html',
    '/shop.html',
    '/gift.html',
    '/experiences.html',
    '/about.html',
    '/contact.html',
    '/gallery.html',
    '/reviews.html',
    '/faq.html',
]
for loc in location_pages:
    all_urls.append(f'/locations/{loc}')

sitemap_entries = []
for url in all_urls:
    sitemap_entries.append(f"  <url>\n    <loc>{domain}{url}</loc>\n    <lastmod>2026-05-28</lastmod>\n    <priority>{'1.00' if url == '/' else '0.80'}</priority>\n  </url>")
with open(sitemap_path, 'w', encoding='utf-8') as f:
    f.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    f.write('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n')
    f.write('\n'.join(sitemap_entries))
    f.write('\n</urlset>\n')

# Generate robots.txt
robots_path = os.path.join(root, 'robots.txt')
with open(robots_path, 'w', encoding='utf-8') as f:
    f.write('User-agent: *\n')
    f.write('Allow: /\n')
    f.write('Disallow: /cgi-bin/\n')
    f.write('Disallow: /tmp/\n')
    f.write('Sitemap: https://artisticworks7.com/sitemap.xml\n')

print('SEO patch complete: metadata updated, sitemap.xml and robots.txt created.')
