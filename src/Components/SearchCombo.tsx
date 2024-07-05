import apiFetch from "@wordpress/api-fetch";
import { ComboboxControl, Spinner } from "@wordpress/components";
import { useEffect, useState } from "react";
import { AttributesI } from "../ds-header/types";
interface PropsI {
  onSelect: (value: string) => void;
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
  link: LinkI;
}
const SearchCombo = ({ onSelect, attributes, link, setAttributes }: PropsI) => {
  const [options, setOptions] = useState<OptionI[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionI | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPages = () => {
    setIsLoading(true);
    apiFetch({ path: "/wp/v2/pages" })
      .then((pages) => {
        const p: PageI[] = pages as PageI[];
        const options = p.map((page: PageI) => {
          return {
            label: page.title.rendered,
            value: page.link,
          };
        });
        setOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching pages:", error);
      })
      .finally(() => {
        console.log("finally");
        const sopt = options.find((option) => option.value === link.url);
        if (sopt) {
          setSelectedOption(sopt);
        }
        setIsLoading(false);
      });
  };

  const getValue = () => {
    const option = options.find((option) => option.value === link.url);
    if (!option) return "";
    return option.value;
  };
  const initialValue = getValue();
  useEffect(() => {
    fetchPages();

    const sopt = options.find((option) => option.value === link.url);
    if (sopt) {
      setSelectedOption(sopt);
    }
    console.log("sopt", sopt);
  }, []);
  const change = (value: string | null | undefined) => {
    if (!value) return;
    onSelect(value);
    setAttributes({
      ...attributes,
      links: attributes.links.map((l) => (l.id === link.id ? { ...l, url: value } : l)),
    });
    const sopt = options.find((option) => option.value === link.url);
    if (sopt) {
      setSelectedOption(sopt);
    }
  };

  const filterChange = (value: string) => {
    console.log("filterChange", value);
  };

  return (
    <div
      style={{
        display: "grid",
        gap: "1rem",
        width: "100%",
        boxSizing: "content-box",
      }}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <ComboboxControl
          value={link.url}
          label="Wybierz stronę"
          onChange={change}
          onFilterValueChange={filterChange}
          __nextHasNoMarginBottom={true}
          options={options}
        />
      )}
    </div>
  );
};
export default SearchCombo;
const Countries = [
  {
    label: "Afghanistan",
    value: "AF",
  },
  {
    label: "Åland Islands",
    value: "AX",
  },
  {
    label: "Albania",
    value: "AL",
  },
  {
    label: "Algeria",
    value: "DZ",
  },
  {
    label: "American Samoa",
    value: "AS",
  },
  {
    label: "Andorra",
    value: "AD",
  },
  {
    label: "Angola",
    value: "AO",
  },
  {
    label: "Anguilla",
    value: "AI",
  },
  {
    label: "Antarctica",
    value: "AQ",
  },
  {
    label: "Antigua and Barbuda",
    value: "AG",
  },
  {
    label: "Argentina",
    value: "AR",
  },
  {
    label: "Armenia",
    value: "AM",
  },
  {
    label: "Aruba",
    value: "AW",
  },
  {
    label: "Australia",
    value: "AU",
  },
  {
    label: "Austria",
    value: "AT",
  },
  {
    label: "Azerbaijan",
    value: "AZ",
  },
];

interface PageI {
  id: number;
  title: {
    rendered: string;
  };
  link: string;
}
const page = {
  id: 6,
  date: "2024-06-02T00:14:00",
  date_gmt: "2024-06-02T00:14:00",
  guid: {
    rendered: "http://localhost:8888/?page_id=6",
  },
  modified: "2024-06-02T01:33:43",
  modified_gmt: "2024-06-02T01:33:43",
  slug: "home",
  status: "publish",
  type: "page",
  link: "http://localhost:8888/",
  title: {
    rendered: "Home",
  },
  content: {
    rendered:
      '\n<div \n\tclass="alignfull wp-block-number44-new-gallery"\tdata-wp-interactive="new-gallery"\n\tdata-wp-init="actions.init"\n\tdata-wp-on-document--scroll="callbacks.handleScroll"\n\tdata-wp-on-document--keydown="actions.handleKeyDown"\n\tdata-wp-context=\'{"button":"Zobacz wie\\u0328cej","filteredImages":[],"categories":[{"id":1,"name":"Domki","order":0,"category_id":0},{"id":2,"name":"Atrakcje dla dzieci","order":1,"category_id":0},{"id":3,"name":"Atrakcje w okolicy","order":2,"category_id":0}],"images":[],"isSelected":0,"isGalleryOpen":false,"galleryImages":[],"0":{"activeIndex":0}}\'\t\tid="p-p-1"\n\t>\n\t\t<div class="switchers" >\n\t\t<template\n\t\tdata-wp-each--cat="context.categories"\n\t\t>\n\t\t<div>\n\t\t\t<div  class="switcher" data-wp-class--switcher-active="callbacks.isSelected"  data-wp-text="context.cat.name" data-wp-on--click="actions.handleSelect"></div>\n\t\t</div>\n\t\t</template>\n\t\t<div data-wp-each-child>\n\t\t\t<div  class="switcher" data-wp-class--switcher-active="callbacks.isSelected"  data-wp-text="context.cat.name" data-wp-on--click="actions.handleSelect">Domki</div>\n\t\t</div>\n\t\t\n\t\t<div data-wp-each-child>\n\t\t\t<div  class="switcher" data-wp-class--switcher-active="callbacks.isSelected"  data-wp-text="context.cat.name" data-wp-on--click="actions.handleSelect">Atrakcje dla dzieci</div>\n\t\t</div>\n\t\t\n\t\t<div data-wp-each-child>\n\t\t\t<div  class="switcher" data-wp-class--switcher-active="callbacks.isSelected"  data-wp-text="context.cat.name" data-wp-on--click="actions.handleSelect">Atrakcje w okolicy</div>\n\t\t</div>\n\t\t\n\t</div>\n\t\t\n\t<!-- if length > 0 -->\n\t\t<!-- if length > 0 -->\n\t</div>',
    protected: false,
  },
  excerpt: {
    rendered: "",
    protected: false,
  },
  author: 1,
  featured_media: 0,
  parent: 0,
  menu_order: 0,
  comment_status: "closed",
  ping_status: "closed",
  template: "",
  meta: {
    footnotes: "",
  },
  _links: {
    self: [
      {
        href: "http://localhost:8888/wp-json/wp/v2/pages/6",
      },
    ],
    collection: [
      {
        href: "http://localhost:8888/wp-json/wp/v2/pages",
      },
    ],
    about: [
      {
        href: "http://localhost:8888/wp-json/wp/v2/types/page",
      },
    ],
    author: [
      {
        embeddable: true,
        href: "http://localhost:8888/wp-json/wp/v2/users/1",
      },
    ],
    replies: [
      {
        embeddable: true,
        href: "http://localhost:8888/wp-json/wp/v2/comments?post=6",
      },
    ],
    "version-history": [
      {
        count: 11,
        href: "http://localhost:8888/wp-json/wp/v2/pages/6/revisions",
      },
    ],
    "predecessor-version": [
      {
        id: 40,
        href: "http://localhost:8888/wp-json/wp/v2/pages/6/revisions/40",
      },
    ],
    "wp:attachment": [
      {
        href: "http://localhost:8888/wp-json/wp/v2/media?parent=6",
      },
    ],
    curies: [
      {
        name: "wp",
        href: "https://api.w.org/{rel}",
        templated: true,
      },
    ],
  },
};
