import Axios from 'axios';

class IPFSService {

  public async fetchData(hash: string): Promise<string> {
    const response = await Axios.get(`https://cloudflare-ipfs.com/ipfs/${hash}`);

    return response.data;
  }
}

export default new IPFSService();