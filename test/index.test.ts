import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test } from "node:test";

import {
  NAVIGATION_CONTRACT,
  NAVIGATION_CONTRACT_JSON_URL,
  NAVIGATION_CONTRACT_VERSION,
  SITE_SHELL_CSS_URL,
  renderSiteNavigation,
  replaceSiteNavigation,
  resolveCurrentSection,
} from "../src/index.ts";

test("exports the active navigation contract", async () => {
  assert.equal(NAVIGATION_CONTRACT.formatVersion, 1);
  assert.equal(NAVIGATION_CONTRACT.contractVersion, "1.0.0");
  assert.equal(NAVIGATION_CONTRACT_VERSION, "1.0.0");
  assert.equal(NAVIGATION_CONTRACT.items.length, 5);
  await assert.doesNotReject(readFile(NAVIGATION_CONTRACT_JSON_URL, "utf8"));
  await assert.doesNotReject(readFile(SITE_SHELL_CSS_URL, "utf8"));
});

test("resolves the current section by the longest path prefix", () => {
  assert.equal(
    resolveCurrentSection("tm-kamishibai", "/tm-kamishibai/"),
    "home",
  );
  assert.equal(
    resolveCurrentSection("tm-kamishibai", "/tm-kamishibai/downloads/"),
    "downloads",
  );
  assert.equal(
    resolveCurrentSection("tm-kamishibai-docs", "/tm-kamishibai-docs/"),
    "documents",
  );
  assert.equal(
    resolveCurrentSection(
      "tm-kamishibai-docs",
      "/tm-kamishibai-docs/workshops/intro/",
    ),
    "workshops",
  );
  assert.equal(
    resolveCurrentSection("tm-kamishibai-samples", "/tm-kamishibai-samples/"),
    "samples",
  );
  assert.equal(resolveCurrentSection("tm-kamishibai", "/unknown/"), null);
});

test("renders one current link and repository target", () => {
  const html = renderSiteNavigation({
    site: "tm-kamishibai",
    pathname: "/tm-kamishibai/downloads/",
  });
  assert.match(html, /data-navigation-contract-version="1\.0\.0"/u);
  assert.equal((html.match(/class="site-nav__link"/gu) ?? []).length, 5);
  assert.equal((html.match(/aria-current="page"/gu) ?? []).length, 1);
  assert.match(
    html,
    /href="https:\/\/github\.com\/kubohiroya\/tm-kamishibai"/u,
  );
});

test("replaces both the navigation and repository link in existing documents", () => {
  const source = `<header>
    <nav class="site-nav"><a href="#">old</a></nav>
    <a class="site-repository" href="#">old repository</a>
  </header>`;
  const html = replaceSiteNavigation(source, {
    site: "tm-kamishibai-samples",
    pathname: "/tm-kamishibai-samples/stories/",
  });
  assert.equal((html.match(/class="site-nav__link"/gu) ?? []).length, 5);
  assert.match(html, /tm-kamishibai-samples/u);
  assert.doesNotMatch(html, /old repository/u);
});
