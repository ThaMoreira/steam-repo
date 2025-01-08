import { useEffect, useState } from 'react';
import './App.css';
import axios from "axios";
import SteamDetails from "./SteamDetails";
import { getLevelByGPQ } from "./utils/getLevelByGPQ"

interface UserGitHub {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string | null;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

interface Repo {
  stargazers_count: number;
  language: string;
}

interface LanguagePercentage {
  name: string;
  percentage: string;
}

interface UserRepos {
  repos: Repo[];
  totalStars: number;
  totalCommits: number;
  language: LanguagePercentage;
}

const userGitHub = "ThaMoreira";

const fetchData = async (
  setUserInfo: (userInfo: UserGitHub) => void,
  setUserRepos: (userRepos: UserRepos) => void,
  github_api_key: string,
  setLoading: (loading: boolean) => void
) => {
  setLoading(true);
  try {
      const userResponse = await axios.get<UserGitHub>('https://api.github.com/users/' + userGitHub, {
          headers: { Authorization: `Bearer ${github_api_key}` }
      });
      setUserInfo(userResponse.data);
      console.log('User Info', userResponse.data);

      const reposResponse = await axios.get<Repo[]>('https://api.github.com/users/' + userGitHub + '/repos?sort=updated', {
          headers: { Authorization: `Bearer ${github_api_key}` },
          params: { type: 'public' }
      });
      const repos = reposResponse.data;

      const commitsResponse = await axios.get(`https://api.github.com/search/commits?q=${encodeURIComponent(`author:${userGitHub} is:merge`)}`, {
          headers: { Authorization: `token ${github_api_key}`, Accept: 'application/vnd.github.cloak-preview' }
      });
      const totalCommits = commitsResponse.data.total_count;

      const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);

      const languages: { [key: string]: number } = repos.reduce((acc, repo) => {
          if (repo.language) {
              acc[repo.language] = acc[repo.language] ? acc[repo.language] + 1 : 1;
          }
          return acc;
      }, {} as { [key: string]: number });
      const totalRepos = repos.length;
      const languagePercentageArray: LanguagePercentage[] = [];
      for (const language in languages) {
          const percentage = ((languages[language] / totalRepos) * 100).toFixed(2);
          languagePercentageArray.push({ name: language, percentage: `${percentage}%` });
      }

      setUserRepos({
          repos,
          totalStars,
          totalCommits,
          language: languagePercentageArray[0]
      });
  } catch (error) {
      console.error('Error fetching data:', error);
  }
  setLoading(false);
};

function App() {
  const [userInfo, setUserInfo] = useState<UserGitHub | undefined>();
  const [userRepos, setUserRepos] = useState<UserRepos | undefined>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const githubApiKey = import.meta.env.GITHUB_API_KEY || '';
    fetchData(setUserInfo, setUserRepos, githubApiKey, setLoading);
  }, []);

  
  // BlueLight
  const avatarBorder = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/570/c6a479fae8979bc9c1a02378e488e3ce06b52cb1.png";
  // Cuttie
  // const avatarBorder = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2855140/4324f3a8e05e1c110fad71443d61c7ba82c4e474.png";
  // Halloween
  // const avatarBorder = "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/items/2603600/ba1ce3d28ef75329afe4e784b1b6f9fe863cfae4.png";
  // Summer
  // const avatarBorder = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861720/410eecdbc6f2505e98863ab4200ca454032b40a2.png"
  
  const subnick = "Tha Moreira";
  const flag = "br";
  const birthday = 1996;
  const sinceExperience = 2021;
  const infoSubTitle = "Transforming code into solutions one line at the time";
  const badgeTitle = "Mid Software Developer";
  const badgeEXP = "12,649";
  const badgeIcon = "/badge.png";
  const twitterLink = "https://twitter.com/thaMoreira13";
  const linkedInLink = "https://www.linkedin.com/in/tha-moreira"
  const urlAvatar = "https://github.com/" + userGitHub + ".png";
  // const urlAvatar = "https://cdn.fastly.steamstatic.com/steamcommunity/public/images/items/2861720/0f9367f89fad6b92c96b686442d61bcb86d627f5.gif";
  const nickname = userInfo?.name;
  const location = userInfo?.location;
  const infoTitle = userInfo?.bio;
  const githubLink = "https://github.com/" + userGitHub;
  const nasaSEE2020 = "https://youtu.be/O7asaD9iUeI?t=8003"
  const hexavalentArticle = "https://joins.emnuvens.com.br/joins/article/view/37/30"
  const nasaSEE2019 = "https://www.liophant.org/conferences/2019/wams/wams2019_overall_p.pdf#page=57"
  const nasaSEE2018 = "https://www.liophant.org/conferences/2018/wams/wams2018_proceedings.pdf#page=13"

  console.log(userRepos, userInfo);

  return (
      loading ? (<p>Loading ...</p>) : (
          <SteamDetails>
              <div className="background"></div>

              <div className="content">
                  <div className="header">
                      <div className="avatar">
                          <img src={urlAvatar} alt="" />
                          <img className="border" src={avatarBorder} alt="" />
                      </div>

                      <div className="nickname">
                          <h2>{nickname}</h2>

                          <div className="subnick">
                              <p>{subnick}</p>
                              <p className="city"><img src={"https://community.cloudflare.steamstatic.com/public/images/countryflags/" + flag + ".gif"} /> {location}</p>
                          </div>

                          <div className="info">
                              <p>{infoTitle}</p>
                              <i>{infoSubTitle}</i>
                              <a href={githubLink} target="_blank" rel="noopener noreferrer">View more info </a>
                          </div>
                      </div>

                      <div className="level">
                          <h2>Level <span>{new Date().getFullYear() - birthday}</span></h2>

                          <div className="badge">
                              <div className="leftContent">
                                  <img src={badgeIcon} alt="BadgeIcon" />
                              </div>

                              <div className="rightContent">
                                  <h4>{badgeTitle}</h4>
                                  <p>{badgeEXP} XP</p>
                              </div>
                          </div>

                          <div className="buttons">
                              <a href={linkedInLink} target="_blank" rel="noreferrer">
                                  <img className="avatar" src="linkedIn.png" alt="" title="LinkedIn"/>
                              </a>
                              <a href={twitterLink} target="_blank" rel="noreferrer">
                                  <img className="avatar" src="x-logo.png" alt="" title="X"/>
                              </a>
                              <a href={githubLink} target="_blank" rel="noreferrer">
                                  <img className="avatar" src="git.png" alt="" title="GitHub"/>
                              </a>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="body">
                  <div className="subgroups">
                      <div className="group">
                          <h3>About me</h3>
                          <p><img src="https://github.com/tairosonloa/tairosonloa/blob/main/assets/wave.gif?raw=true" width="15px" /> Hi, I'm <b>Thaís Moreira</b>, a Software Developer with experience building systems and applications scalable in the e-commerce and industry (SAP Software Solutions).</p>

                          <h3>Technologies</h3>
                          <div className="groupDetails">
                              <div className="badges">
                                  <img src="/js.png" alt="BadgeIcon" title="Javascript Developer" />
                                  <img src="/ts.png" alt="BadgeIcon" title="Typescript Developer" />
                                  <img src="/nodejs.png" alt="BadgeIcon" title="NodeJS Developer" />
                                  <button title="See more on Github" onClick={() => window.open(githubLink, "_blank", "noopener,noreferrer")}>+</button>
                              </div>
                          </div>

                          <h3>Publications</h3>
                            <div className="groupDetails">
                                <a href={hexavalentArticle} target="_blank" rel="noreferrer">× Hexavalent chromium bioadsorption through flamboyant seed biomass</a>
                                <a href={nasaSEE2020} target="_blank" rel="noreferrer">× NASA Simulation Exploration Experience 2020</a>
                                <a href={nasaSEE2019} target="_blank" rel="noreferrer">× NASA Simulation Exploration Experience 2019</a>
                                <a href={nasaSEE2018} target="_blank" rel="noreferrer">× NASA Simulation Exploration Experience 2018</a>
                            </div>
                      </div>
                  </div>
                  <div className="sidebar">
                      <h2>Currently Online</h2>

                      <div className="links">

                          <div className="badges">
                              <img src="/js.png" alt="BadgeIcon" title="Javascript Developer" />
                              <img src="/ts.png" alt="BadgeIcon" title="Typescript Developer" />

                              <img src={"https://community.cloudflare.steamstatic.com/public/images/badges/02_years/steamyears" + (new Date().getFullYear() - sinceExperience) + "_54.png"} alt="BadgeIcon" title="Years of Experience" />

                              {
                                  getLevelByGPQ(userRepos?.totalCommits)
                              }
                          </div>

                          <a href={githubLink} target="_blank" rel="noreferrer">Public Repositories <span>{userInfo?.public_repos}</span></a>
                          <a href={githubLink} target="_blank" rel="noreferrer">Total Stars <span>{userRepos?.totalStars}</span></a>
                          <a href={githubLink} target="_blank" rel="noreferrer">Following <span>{userInfo?.following}</span></a>
                          <a href={githubLink} target="_blank" rel="noreferrer">Followers <span>{userInfo?.followers}</span></a>

                          <h2 className="title">Top Repositories</h2>

                          <div className="links">
                              <a href="https://github.com/ThaMoreira/Angular" className="link" target="_blank" rel="noreferrer">Livro de Receitas</a>
                          </div>
                      </div>
                  </div>
              </div>
              <div className="copyright">
                  <a href="https://github.com/ThaMoreira" target="_blank" rel="noreferrer">© 2025 - {new Date().getFullYear()} Thaís Moreira </a>
              </div>
          </SteamDetails>
      )
  )
}

export default App