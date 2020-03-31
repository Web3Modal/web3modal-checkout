import { IChainData } from "./types";
import supportedChains from "./chains";
import { convertHexToNumber } from "./bignumber";

export function capitalize(string: string): string {
  return string
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export function ellipseText(
  text: string = "",
  maxLength: number = 9999
): string {
  if (text.length <= maxLength) {
    return text;
  }
  const _maxLength = maxLength - 3;
  let ellipse = false;
  let currentLength = 0;
  const result =
    text
      .split(" ")
      .filter(word => {
        currentLength += word.length;
        if (ellipse || currentLength >= _maxLength) {
          ellipse = true;
          return false;
        } else {
          return true;
        }
      })
      .join(" ") + "...";
  return result;
}

export function ellipseAddress(
  address: string = "",
  width: number = 10
): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function padLeft(n: string, width: number, z?: string): string {
  z = z || "0";
  n = n + "";
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function sanitizeHex(hex: string): string {
  hex = hex.substring(0, 2) === "0x" ? hex.substring(2) : hex;
  if (hex === "") {
    return "";
  }
  hex = hex.length % 2 !== 0 ? "0" + hex : hex;
  return "0x" + hex;
}

export function addHexPrefix(hex: string): string {
  if (hex.toLowerCase().substring(0, 2) === "0x") {
    return hex;
  }
  return "0x" + hex;
}

export function removeHexPrefix(hex: string): string {
  if (hex.toLowerCase().substring(0, 2) === "0x") {
    return hex.substring(2);
  }
  return hex;
}

export function getDataString(func: string, arrVals: any[]): string {
  let val = "";
  for (let i = 0; i < arrVals.length; i++) {
    val += padLeft(arrVals[i], 64);
  }
  const data = func + val;
  return data;
}

export function isMobile(): boolean {
  let mobile: boolean = false;

  function hasTouchEvent(): boolean {
    try {
      document.createEvent("TouchEvent");
      return true;
    } catch (e) {
      return false;
    }
  }

  function hasMobileUserAgent(): boolean {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        navigator.userAgent.substr(0, 4)
      )
    ) {
      return true;
    } else if (hasTouchEvent()) {
      return true;
    }
    return false;
  }

  mobile = hasMobileUserAgent();

  return mobile;
}

export function getChainDataFromKey(value: any, key: string): IChainData {
  const chainData = supportedChains.filter(
    (chain: any) => chain[key] === value
  )[0];

  if (!chainData) {
    throw new Error(`Chain matching ${key}=${value} missing or not supported`);
  }

  const API_KEY = process.env.REACT_APP_INFURA_ID;

  if (
    chainData.rpc_url.includes("infura.io") &&
    chainData.rpc_url.includes("%API_KEY%") &&
    API_KEY
  ) {
    const rpcUrl = chainData.rpc_url.replace("%API_KEY%", API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl
    };
  }

  return chainData;
}

export function getChainData(chainId: number): IChainData {
  return getChainDataFromKey(chainId, "chain_id");
}

export function getChainIdFromNetworkId(networkId: number): number {
  const { chain_id } = getChainDataFromKey(networkId, "network_id");
  return chain_id;
}

export async function queryChainId(web3: any) {
  const chainIdRes = await web3.currentProvider.send("eth_chainId", []);

  let chainId = convertHexToNumber(sanitizeHex(addHexPrefix(`${chainIdRes}`)));

  if (!chainId) {
    const networkIdRes = await web3.currentProvider.send("net_version", []);

    const networkId = convertHexToNumber(
      sanitizeHex(addHexPrefix(`${networkIdRes}`))
    );

    if (networkId) {
      const _chainId = getChainIdFromNetworkId(networkId);

      if (_chainId) {
        chainId = _chainId;
      }
    }
  }
  return chainId;
}

export function parseQueryString(queryString: string): any {
  const result: any = {};

  const pairs = (queryString[0] === "?"
    ? queryString.substr(1)
    : queryString
  ).split("&");

  for (let i = 0; i < pairs.length; i++) {
    const keyArr: string[] = pairs[i].match(/\w+(?==)/i) || [];
    const valueArr: string[] = pairs[i].match(/=.+/i) || [];
    if (keyArr[0]) {
      result[decodeURIComponent(keyArr[0])] = decodeURIComponent(
        valueArr[0].substr(1)
      );
    }
  }

  return result;
}

export function removeQueryString(url: string): string {
  const pathEnd: number | undefined =
    url.indexOf("?") !== -1 ? url.indexOf("?") : undefined;

  const result: string =
    typeof pathEnd !== "undefined" ? url.substring(0, pathEnd) : url;

  return result;
}

export function getQueryString(url: string): string {
  const pathEnd: number | undefined =
    url.indexOf("?") !== -1 ? url.indexOf("?") : undefined;

  const queryString: string =
    typeof pathEnd !== "undefined" ? url.substr(pathEnd) : "";

  return queryString;
}

export function appendToQueryString(url: string, newQueryParams: any): string {
  let result = removeQueryString(url);
  let queryString = getQueryString(url);
  let queryParams = parseQueryString(queryString);

  queryParams = { ...queryParams, ...newQueryParams };

  queryString = formatQueryString(queryParams);

  result = result + queryString;

  return result;
}

export function formatQueryString(queryParams: any): string {
  let result = "";

  const keys = Object.keys(queryParams);

  if (keys) {
    keys.forEach((key: string, idx: number) => {
      const value = queryParams[key];
      if (idx === 0) {
        result = `?${key}=${value}`;
      } else {
        result = result + `&${key}=${value}`;
      }
    });
  }

  return result;
}

export function checkRequiredParams(params: any, requiredParams: string[]) {
  requiredParams.forEach(x => {
    if (!params[x]) {
      throw new Error(`No ${capitalize(x)} Value Provided`);
    }
  });
}
