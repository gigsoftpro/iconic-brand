"use client";

import Image from "next/image";
import {
  HiLightningBolt,
  HiStar,
  HiUsers,
  HiTrendingUp,
  HiCheckCircle,
  HiArrowRight,
} from "react-icons/hi";
import {
  FaAward,
  FaRocket,
  FaHandshake,
  FaChartLine,
  FaGlobe,
  FaCertificate,
  FaShieldAlt,
} from "react-icons/fa";
import Link from "next/link";

export default function AboutPage() {
  const values = [
    {
      title: "Excellence",
      description:
        "We deliver nothing but the highest quality in everything we do",
      icon: FaAward,
      gradient: "from-[#D5AF34] to-[#C19A2E]",
    },
    {
      title: "Innovation",
      description: "We stay ahead of trends and bring cutting-edge solutions",
      icon: FaRocket,
      gradient: "from-[#5F9EA0] to-[#4A7D7F]",
    },
    {
      title: "Partnership",
      description: "Your success is our success - we grow together",
      icon: FaHandshake,
      gradient: "from-[#D5AF34] via-[#FFD700] to-[#5F9EA0]",
    },
    {
      title: "Results",
      description: "Data-driven strategies that deliver measurable ROI",
      icon: FaChartLine,
      gradient: "from-[#5F9EA0] to-[#4A7D7F]",
    },
  ];

  const stats = [
    { number: "200+", label: "Clients Worldwide", icon: HiUsers },
    { number: "98%", label: "Satisfaction Rate", icon: HiStar },
    { number: "20+", label: "Years Experience", icon: HiTrendingUp },
    { number: "20+", label: "Industry Awards", icon: HiLightningBolt },
  ];

  const leadership = [
    {
      name: "Joshua Paul Hooks",
      role: "Founder | Chief Executive Officer",
      bio: "Joshua Paul Hooks is a serial entrepreneur and consultant known for scaling startups into nationally recognized brands. As Founder of Iconic Brand Group, Joshua helps business owners and operators transform ideas into high-growth ventures by combining operational systems, customer acquisition strategies, and AI automations. His career includes consulting for startups and Fortune 500 companies alike, guiding them through product development, branding, and U.S. market entry. Driven by family, community, and a passion for building impactful businesses, Joshua brings a rare mix of visionary leadership and hands-on execution to every project he touches. Joshua serves on the board of several nonprofit organizations including The Harrington Foundation, A Servants Way, and FASFA United.",
      image: "/advisors/josh hooks.jpg.jpg",
    },
    {
      name: "John Aguilar",
      role: "Chief Operations Officer",
      bio: "John Aguilar is a seasoned operations specialist with a talent for streamlining businesses through smart systems and efficient processes. With deep experience in IT, logistics, and software, he has managed multi-million-dollar accounts, led product implementations, and built scalable structures that drive growth. John's expertise lies in evaluating technology, optimizing workflows, and ensuring companies operate with precision and profitability. Having contributed to successful product launches in industries from healthcare to electric vehicles, he thrives at the intersection of strategy and execution. At Iconic Brand Group, John empowers founders with the clarity and infrastructure needed to scale confidently.",
      image: "/team/Johnag.PNG",
    },
    {
      name: "Brennen Lesser",
      role: "Chief Marketing Officer",
      bio: "Brennen Lesser is an innovative strategist who bridges the gap between marketing, software, AI, and automations. With a background in both creative and technical fields, Brennen has led cross-functional teams to deliver scalable systems that drive sustainable business growth and operational efficiency. He excels at integrating new technologies, optimizing product development cycles, and crafting solutions that help startups and established companies adapt to changing markets. Brennen's hands-on approach and commitment to continuous improvement have made him a trusted advisor for founders seeking to innovate and scale. At Iconic Brand Group, he brings a unique blend of creativity, technical expertise, and strategic vision to every project.",
      image: "/team/brennen-lesser.png",
    },
    {
      name: "Ashby Green",
      role: "Chief Financial Officer",
      bio: "Ashby Green is an accomplished financial executive and strategic advisor recognized for helping businesses achieve sustainable growth through disciplined financial management and operational excellence. As Chief Financial Officer of Iconic Brand Group, Ashby leverages decades of executive leadership to guide organizations in capital planning, financial strategy, and scalable business development. A recipient of the Florida Governor's Business Ambassador Award and the Tampa Bay Business Journal's CFO of the Year, he is also an adjunct professor of Entrepreneurial Finance at the University of Tampa and an active mentor to the next generation of business leaders. Driven by integrity, innovation, and community impact, Ashby brings world-class financial insight and executive leadership to every organization he serves.",
      image: "/team/ashby-green.png",
    },
    {
      name: "Neil Baumann",
      role: "Chief Technology Officer",
      bio: "Neil Baumann, a visionary technology officer, AI strategist, and systems architect known for his elite-level expertise in artificial intelligence and his ability to translate complex technology into real-world business results. Ranked among the top 1% in AI knowledge in the United States, Neil specializes in building advanced sales and operations automation systems that drive efficiency, reduce costs, and unlock scalable growth. With a deep understanding of both emerging technologies and practical business applications, he has helped companies streamline processes, increase revenue, and operate with precision. Neil is passionate about empowering small and mid-sized businesses to compete at a high level by integrating cutting-edge technology into their daily operations. At Iconic Brand Group, he is focused on designing intelligent systems that save time, maximize output, and position clients for long-term success in an increasingly digital world.",
      image: "/team/neil-baumann.png",
    },
    {
      name: "Madison Hamway",
      role: "Product and Social Media Strategist",
      bio: "Madison Hamway is a dynamic strategist who bridges product development with digital storytelling. With expertise in social media, branding, and consumer engagement, she helps companies position their products to resonate with target audiences and scale in competitive markets. Madison has led campaigns that drive awareness, build communities, and convert followers into loyal customers, while also advising on product features and market fit. At Iconic Brand Group, she combines creativity with data-driven insights to craft strategies that amplify brand voice, strengthen customer connections, and fuel sustainable growth across both digital platforms and real-world markets.",
      image: "/team/madison-hamway.png",
    },
  ];

  const advisors = [
    {
      name: "Kevin Harrington",
      role: "Senior Business Advisor",
      bio: "Kevin Harrington is an internationally recognized entrepreneur, investor, and pioneer of modern direct-to-consumer marketing. As an original Shark on ABC's hit show Shark Tank and the inventor of the infomercial, he has launched over 500 products generating more than $5 billion in global sales. Kevin brings decades of expertise in scaling businesses, building brands, and closing deals at the highest level.",
      image: "/advisors/kevin-harrington.jpg",
    },
    {
      name: "Paul Crandell",
      role: "Equity Partner | Senior Marketing Advisor",
      bio: "Paul Crandell is a visionary brand builder known for shaping global culture during his leadership at Red Bull and GoPro. He spearheaded world-class marketing, experiential campaigns, and athlete partnerships that transformed both brands into iconic, youth-driven global powerhouses.",
      image: "/advisors/paul-crandell.jpg",
    },
    {
      name: "Thomas Thompson",
      role: "Senior Legal Advisor",
      bio: "Thomas Thompson is a highly awarded business attorney and litigator, Board Certified in Civil Trial Law for over 15 years. Renowned for his expertise in complex commercial disputes, he has represented major corporations and agencies with exceptional results.",
      image: "/advisors/thomas-thompson.jpg",
    },
    {
      name: "Bruce Hershey",
      role: "Marketing Advisor",
      bio: "Bruce Hershey is a Tampa-based entrepreneur, CMO, and strategic advisor known for transforming brands through innovative marketing, data-driven strategy, and scalable growth systems. He has led high-performing teams, revitalized companies across industries, and built a reputation as a trusted consultant for ambitious businesses.",
      image: "/advisors/bruce-hershey.jpg",
    },
    {
      name: "Turner Tenney \u2013 Tfue",
      role: "Engagement & Content Advisor",
      bio: 'Turner "Tfue" Tenney is a globally recognized YouTuber, streamer, and social media icon with tens of millions of followers. Known for his record-breaking gaming content and unmatched digital influence, he has become one of the most impactful online creators of his generation.',
      image: "/advisors/tfue.jpg",
    },
    {
      name: "Rich Goldstein",
      role: "Intellectual Property Advisor",
      bio: "Rich Goldstein is an intellectual property advisor and patent attorney with over 32 years of experience helping entrepreneurs protect their ideas and increase business value. He has secured more than 2,500 patents and guided countless innovators through the complexities of patents, copyrights, and trademarks, making him a trusted authority in IP strategy and brand protection.",
      image: "/advisors/rich-goldstein.png",
    },
    {
      name: "Matt Coleman",
      role: "Retail Advisor",
      bio: "Matt Coleman is a retail buyer relations expert and big-box strategy specialist known for securing national placements and scaling consumer brands. He has built strong partnerships with major retailers, optimized go-to-market strategies, and guided products from concept to shelf with measurable retail success.",
      image: "/advisors/matt-coleman.png",
    },
    {
      name: "Dr. Greg Lyons",
      role: "Nonprofit Advisor",
      bio: "Dr. Greg Lyons is the founder of Global Surge, leading nonprofit initiatives across hundreds of countries worldwide. A global evangelist, missionary, humanitarian, and strategist, he specializes in scaling mission-driven organizations, developing leaders, and creating lasting international impact.",
      image: "/advisors/dr-greg-lyons.jpg",
    },
    {
      name: "Dean Pratt",
      role: "AI and Tech Advisor",
      bio: "Dean Pratt is an AI and technology advisor specializing in emerging software, automation, and digital infrastructure. He helps organizations adopt cutting-edge technologies, streamline operations, and leverage artificial intelligence to drive innovation, efficiency, and scalable growth in an increasingly digital economy.",
      image: "/advisors/dean-pratt.jpeg",
    },
    {
      name: "Robert Foster",
      role: "Inventions & Proprietary Advisor",
      bio: "Robert Foster is a serial entrepreneur and inventor known for creating category-defining products and building high-performing companies. With decades of experience in construction, manufacturing, and consumer goods, he has launched multiple successful ventures and earned a reputation for innovation, craftsmanship, and industry leadership.",
      image: "/advisors/robert-foster.jpg",
    },
    {
      name: "Daisey Lai",
      role: "Sourcing and Manufacturing Advisor",
      bio: "Daisey Lai is a Shenzhen-based sourcing and manufacturing specialist with decades of experience connecting global brands to top-tier factories and suppliers across Asia. She has overseen product development, quality control, and large-scale production, earning a reputation for reliability, precision, and world-class supply chain execution.",
      image: "/advisors/daisey-lai.jpg",
    },
    {
      name: "Nicole Morris",
      role: "Branding & Creative Advisor",
      bio: "Nicole Morris is a branding and creative design specialist known for crafting compelling visual identities and strategic brand systems. She has led design for startups and established companies alike, transforming concepts into memorable, market-ready brands that inspire trust and drive engagement across digital and print platforms.",
      image: "/advisors/nicole-morris.jpg",
    },
    {
      name: "John Pace",
      role: "Business Development Advisor",
      bio: "John Pace is a business development advisor and co-founder of Ideal Image and other enterprise brands. He has scaled national service companies, built high-performing leadership teams, and driven major market expansion, earning a reputation for strategic growth, operational excellence, and brand success at scale.",
      image: "/advisors/john-pace.jpg",
    },
    {
      name: "Adam Whelchel",
      role: "Strategic Tax Advisor",
      bio: "Adam Whelchel is a tax advisor, strategist, and owner of Axis Accounting & Tax, as well as a seasoned business broker. He helps entrepreneurs understand their true business value, optimize profitability, and structure companies for scalable growth and successful exit opportunities.",
      image: "/advisors/adam-whelchel.jpeg",
    },
    {
      name: "Maureen Famiano",
      role: "Media Advisor",
      bio: "Maureen Famiano is a nationally recognized speaker, media expert, and founder of MEF Media. She helps entrepreneurs and organizations amplify their message, build authority, and connect with audiences through strategic storytelling, media training, and impactful brand positioning.",
      image: "/advisors/maureen-famiano.jpg",
    },
    {
      name: "Mirit Moon",
      role: "PR Advisor",
      bio: "Mirit Moon is a public relations specialist with experience building visibility and credibility for brands, founders, and mission-driven organizations. She specializes in media outreach, brand positioning, and strategic communications that help organizations tell compelling stories and expand their reach.",
      image: "/advisors/mirit-moon.jpg",
    },
    {
      name: "Brenda Ring Wood",
      role: "Personal Development Advisor",
      bio: "Brenda Ring Wood is a personal development advisor and coach dedicated to helping individuals unlock clarity, confidence, and purpose. With a background in mindset coaching and leadership development, she empowers entrepreneurs to grow personally while building meaningful, sustainable success.",
      image: "/advisors/brenda-ring-wood.jpg",
    },
    {
      name: "Malachi Waldron",
      role: "Videography/Media Advisor",
      bio: "Malachi Waldron is a media creative advisor and founder of KW Media. He helps brands and organizations tell compelling stories through strategic content, visual media, and creative direction that drives engagement and lasting impact.",
      image: "/advisors/malachi-waldron.jpg",
    },
    {
      name: "Anthony Fonseca",
      role: "Food Services Advisor",
      bio: "Anthony Fonseca serves as a food services advisor for Young Entrepreneurs of America and is the founder of Station House BBQ. With hands-on experience in restaurant operations and brand growth, he advises youth entrepreneurs on building scalable, service-driven food businesses.",
      image: "/advisors/anthony-fonseca.jpg",
    },
    {
      name: "Dave Vanhoose",
      role: "Public Speaking Advisor",
      bio: "Dave Vanhoose is a public speaking coach and stage strategist who has trained major speakers and thought leaders, helping them master stage presence and deliver high-impact messages. He specializes in helping entrepreneurs and business leaders craft compelling presentations that drive engagement, build authority, and convert audiences into customers.",
      image: "/advisors/dave-vanhoose.jpg",
    },
    {
      name: "Sandra Terra",
      role: "Non-Profit Advisor",
      bio: "Sandra Terra is a nonprofit advisor and founder of FASFA United, known for empowering organizations through strategic development, funding guidance, and community-driven program design. She has helped numerous nonprofits expand their impact, strengthen operations, and secure critical resources for long-term mission success.",
      image: "/advisors/sandra-terra.jpg",
    },
    {
      name: "Parth Gulati",
      role: "Pay-Per-Click Strategic Advisor",
      bio: "Parth Gulati is a pay-per-click advisor and master ads strategist known for building high-performing campaigns that maximize ROI. He has managed millions in ad spend, scaled brands across digital platforms, and consistently delivered measurable growth through precision targeting and data-driven optimization.",
      image: "/advisors/parth-gulati.jpg",
    },
    {
      name: "Bella Unitarian",
      role: "Influencer Relations & Social Advisor",
      bio: "Bella Unitarian is a social media strategist and influencer-relations advisor known for building powerful digital communities and high-performing creator partnerships. She has guided brands in scaling visibility, strengthening engagement, and leveraging influencers to drive measurable growth across major social platforms.",
      image: "/advisors/bella-unitarian.jpg",
    },
    {
      name: "Reggie Stewart",
      role: "Branding Advisor",
      bio: "Reggie Stewart is a branding advisor known for helping companies define powerful brand identities and market positioning. He has guided startups and established businesses alike in crafting compelling messaging, visual strategy, and brand experiences that build recognition, trust, and long-term customer loyalty.",
      image: "/advisors/reggie-stewart.png",
    },
    {
      name: "Rudy Frederico",
      role: "Senior Franchise Advisor",
      bio: "Rudy Frederico is a senior franchise advisor with over 30 years of experience helping nearly 900 individuals and families find the right franchise opportunities. A former franchise owner himself, he brings firsthand insight, guiding entrepreneurs to build successful, scalable businesses through franchising.",
      image: "/advisors/rudy-frederico.png",
    },
    {
      name: "Kevin Miller",
      role: "Strategic Market Entry Advisor",
      bio: "Kevin Miller is a strategic market entry advisor at Iconic Brand Group, specializing in distribution and dealer networks. Since 2007, he has helped manufacturers, foreign and domestic, successfully launch, position, and scale brands across the U.S. market.",
      image: "/advisors/Kevin-miller.JPG",
    },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/general/146187.jpg"
            fill
            className="object-cover"
            alt="About Us"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-black/75 to-black/85"></div>
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-[7.25rem]">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
            <span className="text-[#D5AF34] font-bold text-sm tracking-wider uppercase">
              About Iconic Brand Group
            </span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-black mb-8 text-white leading-tight">
            Building{" "}
            <span className="bg-gradient-to-r from-[#D5AF34] via-[#FFD700] to-[#5F9EA0] text-transparent bg-clip-text">
              Iconic
            </span>{" "}
            Brands
          </h1>

          <p className="text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            We&apos;re not just consultants or marketers—we&apos;re your
            strategic partners in building brands that stand the test of time
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <IconComponent className="w-8 h-8 text-[#D5AF34] mb-3 mx-auto" />
                  <div className="text-4xl font-black text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Team - Moved directly under Hero */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Meet Our{" "}
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Leadership
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Industry veterans with decades of combined experience driving
              growth and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {leadership.map((member, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="relative h-[400px] bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={member.image}
                    fill
                    className="object-cover object-[center_30%] group-hover:scale-105 transition-transform duration-500"
                    alt={member.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-black text-white mb-2">
                      {member.name}
                    </h3>
                    <span className="inline-block bg-[#D5AF34] text-white px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider">
                      {member.role}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {member.bio}
                    {/* {member.link && (
                      <>
                        {" "}
                        <a
                          href={member.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#D5AF34] underline hover:text-[#5F9EA0] transition-colors"
                        >
                          {member.link.label}
                        </a>
                      </>
                    )} */}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Network */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-[#F8F8F8] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Advisory Network
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic advisors and industry experts who guide our vision and
              enhance our capabilities
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {advisors.map((advisor, i) => (
              <div
                key={i}
                className="group bg-white rounded-xl border border-gray-200 p-4 hover:border-[#D5AF34] hover:shadow-lg transition-all duration-300"
              >
                <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={advisor.image}
                    fill
                    className="object-cover object-[center_30%]"
                    alt={advisor.name}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-bold text-gray-900 mb-1">
                    {advisor.name}
                  </h3>
                  <p className="text-xs text-[#D5AF34] font-semibold mb-2">
                    {advisor.role}
                  </p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {advisor.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-black mb-6">
                Our{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                  Mission
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                To empower businesses with strategic insights and innovative
                solutions that transform them into industry leaders. We believe
                every brand has the potential to become iconic.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Through data-driven strategies, creative excellence, and
                unwavering commitment to our clients&apos; success, we deliver
                results that exceed expectations.
              </p>
            </div>

            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/general/Joshua Paul Hooks Denago EV copy000.jpg"
                fill
                className="object-cover"
                alt="Our Mission"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6 bg-gradient-to-b from-white via-[#FFF9E6] to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              Our{" "}
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Values
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div
                  key={index}
                  className="group bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#D5AF34] hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
                >
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${value.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
                  >
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>

                  <h3 className="text-2xl font-black mb-3 text-gray-900">
                    {value.title}
                  </h3>

                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/general/pexels-startup-stock-photos-7075.jpg"
                fill
                className="object-cover"
                alt="Our Culture"
              />
            </div>

            <div>
              <h2 className="text-5xl font-black mb-6">
                Where Talent{" "}
                <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                  Thrives
                </span>
              </h2>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                We&apos;ve built a culture that attracts the best minds in the
                industry. Our team is our greatest asset, and we invest heavily
                in their growth and development.
              </p>

              <div className="space-y-6">
                {[
                  {
                    title: "Continuous Learning",
                    desc: "Annual education budget for every team member",
                  },
                  {
                    title: "Work-Life Balance",
                    desc: "Flexible schedules and remote work options",
                  },
                  {
                    title: "Innovation Time",
                    desc: "20% time for passion projects and experimentation",
                  },
                  {
                    title: "Competitive Benefits",
                    desc: "Top-tier health, retirement, and wellness programs",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0] rounded-xl flex items-center justify-center flex-shrink-0">
                      <HiCheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-black mb-6">
              <span className="bg-gradient-to-r from-[#D5AF34] to-[#5F9EA0] text-transparent bg-clip-text">
                Global
              </span>{" "}
              Reach, Local Expertise
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Offices and partners across the world to serve you better
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                city: "Tampa",
                country: "USA",
                desc: "Global Headquarters",
                icon: FaGlobe,
              },
              {
                city: "London",
                country: "UK",
                desc: "European Operations",
                icon: FaGlobe,
              },
              {
                city: "Shenzhen",
                country: "China",
                desc: "Asia-Pacific Hub",
                icon: FaGlobe,
              },
            ].map((office, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <FaGlobe className="w-12 h-12 text-[#D5AF34] mb-4" />
                <h3 className="text-3xl font-black mb-2">{office.city}</h3>
                <p className="text-gray-400 mb-2">{office.country}</p>
                <p className="text-sm text-gray-500">{office.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#D5AF34] to-[#5F9EA0]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-black text-white mb-6">
            Ready to Build Your Legacy?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join 200+ businesses that trust us to elevate their brands
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-white text-[#D5AF34] px-12 py-6 rounded-full font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            Let&apos;s Talk
            <HiArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </>
  );
}
