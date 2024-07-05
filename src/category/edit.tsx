import { InnerBlocks, InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { AttributesI } from "./types";
import { Panel, PanelBody, SelectControl } from "@wordpress/components";
import "./editor.scss";
import { useEffect, useState } from "react";
import apiFetch from "@wordpress/api-fetch";
interface PropsI {
  attributes: AttributesI;
  setAttributes: (attributes: AttributesI) => void;
}
export default function Edit({ attributes, setAttributes }: PropsI) {
  const [patterns, setPatterns] = useState<PatternI[]>([]);
  const blockProps = useBlockProps();
  useEffect(() => {
    apiFetch({ path: "/wp/v2/blocks" }).then((s) => {
      const fetchedPatterns = s as PatternI[];
      setPatterns(fetchedPatterns);
    });
  }, []);
  useEffect(() => {
    if (attributes.sidebar) {
      console.log("attr", attributes.sidebar);
    }
  }, [attributes.sidebar]);
  return (
    <>
      <InspectorControls>
        <Panel>
          <PanelBody title="Sidebar" initialOpen={true}>
            <SelectControl
              label="Sidebar"
              options={patterns.map((item) => ({
                label: item.title.raw,
                value: item.content.raw,
              }))}
              value={attributes.sidebar}
              onChange={(value) => setAttributes({ ...attributes, sidebar: value })}
            />
          </PanelBody>
        </Panel>
      </InspectorControls>
      <article {...blockProps}>
        <p dangerouslySetInnerHTML={{ __html: attributes.sidebar }}></p>
        <p>{attributes.sidebar}</p>
        <InnerBlocks />
      </article>
    </>
  );
}

interface PatternI {
  id: number;
  slug: string;
  content: {
    raw: string;
  };
  title: {
    raw: string;
  };
}
