import {
  ALL_LEARNING_SECTIONS_ELEMENT_ID_ARRAY,
  ALL_SECTIONS_ARRAY,
} from '@/pages/Projects/KnowledgeHub/constants';
import { DASH_SPLIT_STRING } from '@/pages/Projects/KnowledgeHub/Contents/Tabs/pages/Hooks/contents';
import { getDefaultSubTabSelectedIndex } from '@/pages/Projects/KnowledgeHub/helpful';
import { LearningSectionsType } from '@/pages/Projects/KnowledgeHub/interfaces';
import { useCallback, useDebugValue, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router';
import { SearchQueryParamsT, SearchQueryParamsV, UrlQueryType } from '../interfaces';
import { sanitizeSectionToURL } from '../Utils/Helpers/global-utils';

export const useUrlQueryParams = () => {
  // TODO: Fix toggle issue for openAll, also we have to open just the current section, not all the sections when we toggle the switcher, maybe we can pass the section
  const { hash } = useLocation();
  const [value, setValue] = useState<number>(+getDefaultSubTabSelectedIndex(hash));
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useDebugValue(value);

  const handleURLQueryParams = (hashValueIndex: number, checked?: boolean) => {
    const allLearningSectionsValues = Object.values(ALL_LEARNING_SECTIONS_ELEMENT_ID_ARRAY);

    let finalHashValue = hash;
    if (hash) {
      const getSectionKey = hash.substring(1);
      const getSectionKey2 = getSectionKey.split(DASH_SPLIT_STRING);
      const validateSectionName = allLearningSectionsValues.find(x =>
        x.includes(getSectionKey2.at(0) || ''),
      );

      // console.log({ ALL_SECTIONS_ARRAY, validateSectionName, getSectionKey2 });
      if (validateSectionName) {
        const subSectionsArray = ALL_SECTIONS_ARRAY[validateSectionName as LearningSectionsType];
        const getSubSection = subSectionsArray[hashValueIndex];
        const hashValue = sanitizeSectionToURL(getSubSection.title);

        finalHashValue = validateSectionName + DASH_SPLIT_STRING + hashValue;
      }
    }

    if (typeof checked !== 'undefined') {
      navigate({
        hash: finalHashValue,
        // search: `openAll=${checked}`,
      });
    } else {
      navigate({
        hash: finalHashValue,
        // search: `openAll=${DEFAULT_OPEN_ALL}`,
      });
    }

    setValue(+hashValueIndex);
  };

  //TODO: check openAll toggle (fucks everything) and fix this when we have multiple values for searchParams (openAll + fullModal) in URL
  // check also for both (all) queryParams for sections when you have all of them, it opens all LEARNING_SECTIONS into SectionContentList
  const handleSearchParams = useCallback(
    (key: SearchQueryParamsT, value?: string | boolean | number | undefined) => {
      // console.log({ key, value });

      const url = new URLSearchParams();

      if (value) {
        url.set(key.toString(), `${value}`);
      } else {
        url.delete(key.toString());
      }

      const search = url
        .entries()
        .map(x => `${x[0]}=${x[1]}`)
        .reduce(
          (acc, current, index) => (index === url.size - 1 ? acc + current : acc + current + '&'),
          '',
        );

      navigate({
        hash, // TODO: BUG, check why is previous hash value/ why hash value is changed between rerendering of the openModal component
        search: search,
      });
    },
    [hash, navigate],
  );

  const getUrlQuery = {
    openAll: !!searchParams.get(SearchQueryParamsV.openAll),
    fullMode: !!searchParams.get(SearchQueryParamsV.fullMode),
  } as UrlQueryType;

  return {
    handleURLQueryParams,
    hashValueIndex: +value,
    handleSearchParams,
    searchParams,
    hash,
    getUrlQuery,
  };
};
