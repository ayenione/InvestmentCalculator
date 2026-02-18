export interface Article {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  relatedCalculator: string;
  relatedCalculatorPath: string;
  content: string;
}

export const articles: Article[] = [
  {
    slug: 'compound-interest',
    title: 'How Compound Interest Works: The Key to Growing Your Wealth',
    description: 'Learn how compound interest works, why Einstein reportedly called it the eighth wonder of the world, and how to harness it for your financial goals.',
    category: 'Investing',
    readTime: '5 min read',
    relatedCalculator: 'Investment Calculator',
    relatedCalculatorPath: '/investment',
    content: `
## What Is Compound Interest?

Compound interest is the process of earning interest not only on your initial investment (the principal) but also on the interest that has already been added to your balance. This creates a snowball effect where your money grows at an accelerating rate over time.

The concept is often attributed to Albert Einstein, who reportedly called compound interest "the eighth wonder of the world." Whether or not the quote is genuine, the principle behind it is undeniably powerful.

## Simple Interest vs. Compound Interest

With **simple interest**, you only earn interest on your original principal. If you invest $10,000 at 5% simple interest, you earn $500 every year, no matter how long the investment lasts. After 20 years, you'd have $20,000.

With **compound interest**, you earn interest on your growing balance. That same $10,000 at 5% compounded annually would grow to $26,533 after 20 years — over $6,500 more than simple interest. The difference grows dramatically over longer periods.

## The Compound Interest Formula

The basic formula is:

**A = P(1 + r/n)^(nt)**

Where:
- **A** = the future value of the investment
- **P** = the principal (initial investment)
- **r** = the annual interest rate (as a decimal)
- **n** = the number of times interest is compounded per year
- **t** = the number of years

## Why Starting Early Matters

The most powerful aspect of compound interest is time. Consider two investors:

- **Investor A** starts investing $200/month at age 25 and stops at age 35 (10 years of contributions, totaling $24,000).
- **Investor B** starts investing $200/month at age 35 and continues until age 65 (30 years of contributions, totaling $72,000).

Assuming an 8% annual return, Investor A ends up with approximately $509,000 at age 65, while Investor B ends up with approximately $298,000. Despite investing three times less money, Investor A comes out ahead because their money had more time to compound.

## How Compounding Frequency Affects Growth

Interest can compound at different intervals: daily, monthly, quarterly, or annually. More frequent compounding results in slightly higher returns:

- **$10,000 at 8% for 10 years:**
  - Annually: $21,589
  - Quarterly: $22,080
  - Monthly: $22,196
  - Daily: $22,253

While the differences may seem small, they add up significantly over decades with larger sums.

## Tips to Maximize Compound Interest

1. **Start as early as possible** — time is the most critical factor
2. **Be consistent** — regular contributions amplify the compounding effect
3. **Reinvest your returns** — don't withdraw interest or dividends
4. **Minimize fees** — high fees eat into your compounding returns
5. **Be patient** — the biggest gains come in the later years

Use our Investment Calculator to see exactly how compound interest can work for your specific savings goals.
    `,
  },
  {
    slug: 'sip-vs-lump-sum',
    title: 'SIP vs Lump Sum Investing: Which Strategy Is Better?',
    description: 'Compare systematic investment plans (SIP) with lump sum investing. Understand dollar-cost averaging and which approach suits your situation.',
    category: 'Investing',
    readTime: '5 min read',
    relatedCalculator: 'Investment Calculator',
    relatedCalculatorPath: '/investment',
    content: `
## What Are SIP and Lump Sum Investing?

When you have money to invest, you essentially have two approaches: invest it all at once (lump sum) or spread it out over time in regular installments (Systematic Investment Plan, or SIP). Each approach has distinct advantages, and the best choice depends on your circumstances.

**Lump sum investing** means putting a large amount of money into an investment all at once. For example, if you receive a $50,000 inheritance, you invest the entire amount immediately.

**SIP (Systematic Investment Plan)** involves investing a fixed amount at regular intervals — typically monthly. For example, investing $500 every month regardless of market conditions.

## The Case for Lump Sum Investing

Historical data consistently shows that lump sum investing outperforms SIP roughly two-thirds of the time. The reason is straightforward: markets tend to rise over time, so getting your money invested sooner gives it more time to grow.

A study by Vanguard analyzed rolling periods across multiple markets and found that lump sum investing beat dollar-cost averaging about 68% of the time over 12-month periods. The advantage comes from having more capital exposed to market growth for a longer period.

**When lump sum works best:**
- You have a large sum available (inheritance, bonus, sale proceeds)
- Markets are trending upward
- You have a long investment horizon
- You can handle short-term volatility emotionally

## The Case for SIP (Dollar-Cost Averaging)

While SIP may not win on pure returns, it offers significant psychological and practical advantages. With SIP, you automatically buy more shares when prices are low and fewer when prices are high. This reduces the risk of investing a large sum right before a market downturn.

**When SIP works best:**
- You're investing from regular income (most common scenario)
- Markets are volatile or declining
- You're uncomfortable with the risk of timing the market
- You want to build a disciplined saving habit
- You don't have a large lump sum available

## Dollar-Cost Averaging in Practice

Here's how dollar-cost averaging works: imagine you invest $500 monthly in a fund that fluctuates in price:

- **Month 1:** Price $50 → Buy 10 shares
- **Month 2:** Price $40 → Buy 12.5 shares
- **Month 3:** Price $45 → Buy 11.1 shares
- **Month 4:** Price $55 → Buy 9.1 shares

After 4 months, you've invested $2,000 and own 42.7 shares. Your average cost per share is $46.84, which is lower than the simple average price of $47.50. This is the benefit of dollar-cost averaging.

## The Hybrid Approach

Many financial advisors suggest a middle ground: invest a portion as a lump sum immediately, then invest the rest via SIP over 3-6 months. This captures some of the benefit of early market exposure while reducing the risk of poor timing.

For example, if you have $60,000 to invest, you might put $30,000 in immediately and invest $5,000 per month over the next 6 months.

## Which Should You Choose?

For most people, the SIP question is academic — they invest from monthly income, making SIP the natural approach. If you do have a lump sum, consider your risk tolerance and investment timeline. If you can handle short-term volatility, lump sum is statistically likely to produce better results. If the thought of losing money keeps you up at night, SIP provides peace of mind.

Try our Investment Calculator to compare different contribution strategies and see how they affect your long-term returns.
    `,
  },
  {
    slug: 'understanding-inflation',
    title: 'Understanding Inflation and How It Affects Your Money',
    description: 'Learn what inflation is, how it erodes purchasing power, and strategies to protect your savings from its effects.',
    category: 'Economics',
    readTime: '5 min read',
    relatedCalculator: 'Inflation Calculator',
    relatedCalculatorPath: '/inflation',
    content: `
## What Is Inflation?

Inflation is the rate at which the general price level of goods and services rises over time, resulting in a decrease in purchasing power. When inflation is 3%, something that costs $100 today will cost approximately $103 one year from now. While individual prices fluctuate constantly, inflation measures the overall trend across the economy.

Central banks, such as the Federal Reserve in the United States, typically target an annual inflation rate of around 2%, which is considered healthy for economic growth. However, actual inflation can vary significantly from this target.

## How Inflation Erodes Purchasing Power

The most tangible effect of inflation is reduced purchasing power. Consider these examples:

- A movie ticket that cost $5 in 2000 costs roughly $11 today
- A gallon of gas that cost $1.50 in 2000 costs about $3.50 today
- A college education that cost $15,000/year in 2000 costs over $35,000/year today

At 3% annual inflation, $100,000 in savings would have the purchasing power of only about $55,000 after 20 years. In other words, your money lost nearly half its real value just sitting idle.

## The Real Rate of Return

When evaluating investments, it's crucial to consider the **real rate of return** — your investment return minus the inflation rate. If your savings account earns 2% but inflation is 3%, your real return is actually -1%. You're losing purchasing power despite "earning" interest.

This is why financial advisors emphasize investing in assets that historically outpace inflation:

- **Stocks:** Average annual return of about 10% (roughly 7% after inflation)
- **Bonds:** Average annual return of about 5% (roughly 2% after inflation)
- **Savings accounts:** Currently 4-5% (roughly 1-2% after inflation)
- **Cash under a mattress:** 0% return, losing 2-3% to inflation annually

## Types of Inflation

**Demand-pull inflation** occurs when demand for goods and services exceeds supply. When consumers have more money to spend (from wage increases or stimulus payments), prices tend to rise.

**Cost-push inflation** happens when the cost of production increases. Rising raw material prices, supply chain disruptions, or higher wages force businesses to raise their prices.

**Built-in inflation** is the wage-price spiral where workers demand higher wages to keep up with rising prices, which in turn drives prices higher as businesses pass on the increased labor costs.

## Protecting Your Money from Inflation

1. **Invest in stocks** — Equities have historically been the best long-term hedge against inflation, returning roughly 7% after inflation
2. **Consider TIPS** — Treasury Inflation-Protected Securities are government bonds that adjust their value based on inflation
3. **Own real estate** — Property values and rental income tend to rise with inflation
4. **Avoid holding too much cash** — While an emergency fund in cash is essential, excess cash loses value to inflation over time
5. **Invest in yourself** — Education and skills that increase your earning power help you stay ahead of rising costs

## Inflation and Retirement Planning

Inflation has an enormous impact on retirement planning. If you need $50,000 per year today, at 3% inflation you'll need about $90,000 per year in 20 years to maintain the same lifestyle. Over a 30-year retirement, the cumulative effect can be staggering.

This is why retirement planners recommend using inflation-adjusted (real) return rates when projecting future needs. Our Inflation Calculator can help you visualize how inflation will affect your purchasing power over any time period.
    `,
  },
  {
    slug: 'retirement-planning-basics',
    title: 'Retirement Planning Basics: A Step-by-Step Guide',
    description: 'Learn the fundamentals of retirement planning, from setting goals to choosing the right savings strategy for a comfortable retirement.',
    category: 'Retirement',
    readTime: '6 min read',
    relatedCalculator: 'Retirement Planner',
    relatedCalculatorPath: '/retirement',
    content: `
## Why Start Planning for Retirement Now?

Regardless of your age, the best time to start planning for retirement is today. The power of compound interest means that every year you delay costs you significantly. Someone who starts saving $300/month at age 25 could accumulate over $1 million by age 65 at an 8% average return. Waiting until age 35 to start would yield roughly half that amount — despite only missing 10 years of contributions.

## Step 1: Define Your Retirement Goals

Before crunching numbers, think about what retirement looks like for you:

- **When do you want to retire?** The traditional age is 65, but early retirement (FIRE movement) or working longer are both valid options.
- **Where will you live?** Cost of living varies dramatically by location.
- **What lifestyle do you envision?** Travel, hobbies, and healthcare needs all affect your required savings.
- **How long will retirement last?** With increasing life expectancies, plan for 25-30+ years of retirement.

A common guideline is that you'll need 70-80% of your pre-retirement income annually during retirement, though this varies widely based on individual circumstances.

## Step 2: Calculate Your Retirement Number

Your "retirement number" is the total savings needed to fund your retirement. A widely used guideline is the **4% Rule**: you can safely withdraw 4% of your retirement savings in the first year, then adjust for inflation each subsequent year, and your money should last 30 years.

Using the 4% rule in reverse: if you need $60,000 per year in retirement, you need $60,000 ÷ 0.04 = **$1,500,000** in savings.

Don't forget to account for:
- Social Security benefits (which reduce the amount you need)
- Pension income (if applicable)
- Inflation (your expenses will increase over time)
- Healthcare costs (often the largest retirement expense)

## Step 3: Assess Where You Stand

Take stock of your current situation:

- **Current retirement savings** — 401(k), IRA, and other retirement accounts
- **Current monthly contributions** — How much you're saving per month
- **Expected Social Security** — Check your statement at ssa.gov
- **Other income sources** — Pensions, rental income, part-time work

## Step 4: Choose Your Retirement Accounts

Take advantage of tax-advantaged accounts:

- **401(k) or 403(b)** — Employer-sponsored plans, often with matching contributions. Always contribute enough to get the full employer match — it's free money.
- **Traditional IRA** — Tax-deductible contributions that grow tax-deferred. You pay taxes on withdrawals in retirement.
- **Roth IRA** — After-tax contributions that grow tax-free. Withdrawals in retirement are tax-free.
- **HSA** — If you have a high-deductible health plan, an HSA offers triple tax benefits and can be used for healthcare costs in retirement.

## Step 5: Invest Appropriately

Your investment allocation should reflect your time horizon and risk tolerance:

- **In your 20s-30s:** Aggressive growth (80-90% stocks, 10-20% bonds)
- **In your 40s:** Moderate growth (70-80% stocks, 20-30% bonds)
- **In your 50s:** Balanced (60% stocks, 40% bonds)
- **Near retirement:** Conservative (40-50% stocks, 50-60% bonds)

Target-date funds automatically adjust this allocation as you age, making them a simple "set it and forget it" option.

## Step 6: Monitor and Adjust

Review your retirement plan at least annually:

- Are you on track to meet your retirement number?
- Has your income changed (allowing higher contributions)?
- Have your retirement goals shifted?
- Is your investment allocation still appropriate for your age?

Use our Retirement Planner to project your retirement savings and see whether you're on track to meet your goals. It accounts for inflation, different return rates, and shows year-by-year projections.
    `,
  },
  {
    slug: 'how-loan-amortization-works',
    title: 'How Loan Amortization Works: Understanding Your Mortgage Payments',
    description: 'Understand how loan amortization works, why most of your early payments go to interest, and strategies to pay off your mortgage faster.',
    category: 'Loans',
    readTime: '5 min read',
    relatedCalculator: 'Loan Calculator',
    relatedCalculatorPath: '/loan',
    content: `
## What Is Loan Amortization?

Amortization is the process of paying off a debt through regular, scheduled payments that cover both principal and interest. Each payment is the same amount, but the proportion going to interest versus principal changes over time. In the early years, most of your payment goes toward interest. As you pay down the balance, more goes toward principal.

This is why understanding amortization is crucial for anyone taking out a mortgage, auto loan, or student loan — it reveals the true cost of borrowing and helps you make informed decisions.

## How an Amortization Schedule Works

Let's walk through a simplified example. Suppose you take out a $200,000 mortgage at 6% interest for 30 years. Your monthly payment would be approximately $1,199.

In your very first month:
- **Interest portion:** $200,000 × 6% ÷ 12 = $1,000
- **Principal portion:** $1,199 - $1,000 = $199
- **Remaining balance:** $200,000 - $199 = $199,801

That's right — only $199 of your $1,199 first payment actually reduces your loan balance. The rest is pure interest cost.

By month 180 (halfway through), the split is roughly even. By the final months, nearly the entire payment goes to principal.

## The True Cost of a Mortgage

Over the full 30-year term of our $200,000 mortgage example:
- **Total payments:** $1,199 × 360 months = $431,676
- **Total interest paid:** $431,676 - $200,000 = **$231,676**

You end up paying more in interest than the original loan amount! This illustrates why the interest rate and loan term have such a dramatic impact on your total cost.

## How Interest Rate Affects Total Cost

Using the same $200,000 loan over 30 years:

| Interest Rate | Monthly Payment | Total Interest Paid |
|:---:|:---:|:---:|
| 4% | $955 | $143,739 |
| 5% | $1,074 | $186,512 |
| 6% | $1,199 | $231,676 |
| 7% | $1,331 | $279,017 |

A 1% difference in interest rate costs roughly $45,000-$50,000 over the life of the loan. This is why shopping for the best rate is so important.

## Strategies to Pay Off Your Loan Faster

1. **Make biweekly payments** — Instead of 12 monthly payments, make 26 half-payments per year. This results in one extra full payment per year and can shave years off your mortgage.

2. **Round up your payments** — If your payment is $1,199, pay $1,300 instead. The extra $101 goes entirely to principal, accelerating your payoff.

3. **Make one extra payment per year** — Even one additional payment annually can reduce a 30-year mortgage by 4-5 years.

4. **Refinance to a shorter term** — Switching from a 30-year to a 15-year mortgage increases your monthly payment but dramatically reduces total interest. A $200,000 loan at 5% costs $186,512 in interest over 30 years but only $84,686 over 15 years.

5. **Refinance to a lower rate** — If rates have dropped since you took out your loan, refinancing can save thousands.

## Understanding Your Amortization Schedule

Use our Loan Calculator to generate a detailed amortization schedule for any loan. You can see exactly how each payment is split between principal and interest, when you'll reach specific equity milestones, and how extra payments would affect your timeline and total cost.
    `,
  },
  {
    slug: 'emergency-fund-guide',
    title: 'Building an Emergency Fund: How Much You Need and Where to Keep It',
    description: 'Learn why an emergency fund is the foundation of financial security, how much to save, and the best places to keep your emergency savings.',
    category: 'Saving',
    readTime: '5 min read',
    relatedCalculator: 'Investment Calculator',
    relatedCalculatorPath: '/investment',
    content: `
## Why You Need an Emergency Fund

An emergency fund is money set aside specifically for unexpected expenses or financial disruptions — a job loss, medical emergency, major car repair, or urgent home maintenance. Without one, a single unexpected event can lead to high-interest credit card debt, loan defaults, or worse.

According to financial surveys, nearly 40% of Americans couldn't cover an unexpected $400 expense without borrowing. Having an emergency fund is the difference between a minor inconvenience and a financial crisis.

## How Much Should You Save?

The standard advice is to save **3 to 6 months of essential living expenses**. However, the right amount depends on your situation:

**3 months is sufficient if:**
- You have a stable job with reliable income
- You're part of a dual-income household
- You have minimal debt
- You have other safety nets (family support, low expenses)

**6+ months is advisable if:**
- You're self-employed or a freelancer
- You're the sole income earner for your household
- Your industry is volatile or seasonal
- You have dependents
- You have significant fixed expenses (mortgage, car payments)

To calculate your target, add up your essential monthly expenses: housing, utilities, food, transportation, insurance, and minimum debt payments. Multiply by your target number of months.

## Where to Keep Your Emergency Fund

Your emergency fund should be **liquid** (easily accessible) and **safe** (not subject to market losses). Here are the best options:

**High-Yield Savings Account (Recommended)**
The best option for most people. Online banks offer rates of 4-5% APY, significantly more than traditional banks. Your money is FDIC-insured up to $250,000 and accessible within 1-2 business days.

**Money Market Account**
Similar to high-yield savings with comparable rates. Some offer check-writing privileges and debit cards, providing faster access to funds.

**Short-Term CDs (Certificate of Deposit)**
You can create a CD ladder with different maturity dates to earn slightly higher interest while maintaining regular access to portions of your fund. However, early withdrawal penalties apply.

**Where NOT to keep it:**
- Checking account (earns little to no interest)
- Under your mattress (loses value to inflation, no insurance)
- Stock market (too volatile for emergency funds)
- Cryptocurrency (far too volatile)

## How to Build Your Emergency Fund

If saving 3-6 months of expenses feels overwhelming, start small and build consistently:

1. **Set an initial goal of $1,000** — This covers most minor emergencies and gives you momentum
2. **Automate your savings** — Set up automatic transfers on payday so you save before you spend
3. **Start with what you can** — Even $50 per month adds up to $600 in a year
4. **Use windfalls** — Tax refunds, bonuses, cash gifts — direct these to your emergency fund
5. **Cut one expense** — Cancel an unused subscription and redirect that money to savings
6. **Gradually increase** — As you get comfortable, increase your monthly savings amount

## When to Use Your Emergency Fund

An emergency fund is for true emergencies only — not for sales, vacations, or planned purchases. Before tapping it, ask yourself:

- Is this expense unexpected?
- Is it urgent and necessary?
- Would not paying create a bigger problem?

If yes to all three, use the fund. Then make a plan to replenish it as quickly as possible.

## Emergency Fund and Investing

A common question is whether you should invest or build an emergency fund first. The answer is almost always: **emergency fund first**. Without this safety net, a financial emergency could force you to sell investments at a loss or take on high-interest debt.

However, if your employer offers a 401(k) match, contribute enough to get the full match while simultaneously building your emergency fund. The match is essentially free money and shouldn't be left on the table.

Use our Investment Calculator to see how your emergency fund grows over time in a high-yield savings account, or to plan your investment strategy once your emergency fund is fully funded.
    `,
  },
  {
    slug: 'investment-strategies-beginners',
    title: 'Investment Strategies for Beginners: How to Start Investing',
    description: 'A beginner-friendly guide to investment strategies, asset allocation, diversification, and building your first investment portfolio.',
    category: 'Investing',
    readTime: '6 min read',
    relatedCalculator: 'Investment Calculator',
    relatedCalculatorPath: '/investment',
    content: `
## Getting Started with Investing

Investing might seem intimidating, but the basics are straightforward. At its core, investing means putting your money into assets that have the potential to grow in value over time. The key is to start — even with small amounts — and let time and compound interest work in your favor.

Before investing, make sure you have:
- An emergency fund (3-6 months of expenses)
- No high-interest debt (credit cards above 8-10%)
- A basic understanding of your financial goals

## Understanding Asset Classes

**Stocks (Equities):** When you buy stock, you own a small piece of a company. Stocks offer the highest long-term growth potential (historically averaging about 10% per year) but come with higher short-term volatility. Your money can drop 20-30% in a bad year, but historically, the stock market has always recovered and reached new highs.

**Bonds (Fixed Income):** Bonds are loans you make to governments or corporations in exchange for regular interest payments. They're more stable than stocks but offer lower returns (historically 4-6% per year). Bonds help stabilize your portfolio during stock market downturns.

**Index Funds and ETFs:** These are baskets of stocks or bonds that track a market index (like the S&P 500). Instead of picking individual companies, you invest in hundreds or thousands of companies at once. They offer instant diversification and typically have very low fees.

**Real Estate:** Can be accessed through REITs (Real Estate Investment Trusts) without buying property. REITs pay dividends and provide portfolio diversification.

## The Power of Diversification

Diversification means spreading your investments across different asset classes, industries, and geographic regions. The principle is simple: don't put all your eggs in one basket.

When one investment performs poorly, others may perform well, reducing your overall risk. A well-diversified portfolio might include:

- U.S. stocks (large, mid, and small companies)
- International stocks (developed and emerging markets)
- Bonds (government and corporate)
- Real estate (REITs)

The easiest way to achieve diversification is through broad index funds. A single total stock market index fund gives you exposure to thousands of companies.

## Asset Allocation by Age

Your asset allocation — the split between stocks and bonds — should reflect your time horizon and risk tolerance. A common rule of thumb is to subtract your age from 110 to determine your stock allocation:

- **Age 25:** 85% stocks, 15% bonds
- **Age 35:** 75% stocks, 25% bonds
- **Age 45:** 65% stocks, 35% bonds
- **Age 55:** 55% stocks, 45% bonds
- **Age 65:** 45% stocks, 55% bonds

These are guidelines, not rules. If you have a higher risk tolerance, you might hold more stocks. If market volatility stresses you out, hold more bonds.

## Common Beginner Strategies

**1. Buy and Hold**
Purchase diversified investments and hold them for years or decades, ignoring short-term market fluctuations. This is the simplest and historically most effective strategy for most investors.

**2. Dollar-Cost Averaging**
Invest a fixed amount regularly (e.g., monthly) regardless of market prices. This removes the stress of trying to time the market and reduces the impact of short-term price swings.

**3. Target-Date Funds**
These all-in-one funds automatically adjust your stock/bond allocation as you approach a target date (usually retirement). You choose the fund closest to your retirement year and contribute — the fund does the rest.

## Common Mistakes to Avoid

1. **Trying to time the market** — Research consistently shows that missing just the 10 best trading days over 20 years can cut your returns in half
2. **Checking your portfolio too often** — Daily price movements are noise; focus on the long-term trend
3. **Selling during downturns** — Market crashes feel scary but are the worst time to sell; historically, staying invested has always been rewarded
4. **Paying high fees** — Choose low-cost index funds with expense ratios below 0.20%
5. **Not starting because the amount feels too small** — $100/month invested at 8% for 30 years grows to over $150,000

## Your Next Steps

1. Open a brokerage account or IRA
2. Start with a single broad index fund (like a total stock market fund)
3. Set up automatic monthly contributions
4. Increase your contributions as your income grows
5. Stay the course through market ups and downs

Use our Investment Calculator to model different scenarios and see how your investments could grow over time based on your contribution amounts and expected returns.
    `,
  },
  {
    slug: 'rule-of-72',
    title: 'The Rule of 72 Explained: A Quick Way to Estimate Investment Growth',
    description: 'Learn the Rule of 72, a simple mental math trick to estimate how long it takes for your money to double at any given interest rate.',
    category: 'Investing',
    readTime: '4 min read',
    relatedCalculator: 'Investment Calculator',
    relatedCalculatorPath: '/investment',
    content: `
## What Is the Rule of 72?

The Rule of 72 is a simple formula used to estimate how long it takes for an investment to double in value at a fixed annual rate of return. The calculation is straightforward:

**Years to double = 72 ÷ Annual interest rate**

For example:
- At **6% return:** 72 ÷ 6 = **12 years** to double
- At **8% return:** 72 ÷ 8 = **9 years** to double
- At **10% return:** 72 ÷ 10 = **7.2 years** to double
- At **12% return:** 72 ÷ 12 = **6 years** to double

This quick mental math gives you a remarkably accurate estimate without needing a calculator.

## How Accurate Is It?

The Rule of 72 is an approximation, but it's surprisingly precise for interest rates between 2% and 20%. Here's how it compares to the exact calculation:

| Rate | Rule of 72 | Actual Years | Difference |
|:---:|:---:|:---:|:---:|
| 4% | 18.0 years | 17.7 years | 0.3 years |
| 6% | 12.0 years | 11.9 years | 0.1 years |
| 8% | 9.0 years | 9.0 years | 0.0 years |
| 10% | 7.2 years | 7.3 years | 0.1 years |
| 12% | 6.0 years | 6.1 years | 0.1 years |

At 8%, the Rule of 72 is perfectly accurate. For rates significantly above 20% or below 2%, the estimate becomes less precise.

## Using the Rule in Reverse

The Rule of 72 also works in reverse. If you want your money to double in a specific number of years, divide 72 by that number to find the required annual return:

- **Double in 5 years:** 72 ÷ 5 = **14.4% return needed**
- **Double in 10 years:** 72 ÷ 10 = **7.2% return needed**
- **Double in 15 years:** 72 ÷ 15 = **4.8% return needed**
- **Double in 20 years:** 72 ÷ 20 = **3.6% return needed**

This is helpful for evaluating whether investment promises are realistic. If someone claims they can double your money in 3 years, that would require a 24% annual return — extremely unlikely from any legitimate investment.

## The Rule of 72 and Inflation

The Rule of 72 isn't just for investments — it works for anything that grows (or shrinks) at a compound rate, including inflation's erosion of purchasing power.

At 3% inflation, your money's purchasing power halves in 72 ÷ 3 = **24 years**. This means $100,000 today will only buy about $50,000 worth of goods in 24 years if you don't invest it.

At 7% inflation (as experienced in some recent years), purchasing power halves in just over 10 years. This illustrates why keeping large amounts of cash can be costly.

## Practical Applications

**Evaluating savings accounts:** If your savings account earns 1%, your money doubles in 72 years. At 5% (current high-yield rates), it doubles in about 14 years. The difference is dramatic.

**Comparing investments:** A stock portfolio averaging 10% doubles every 7.2 years. Over 36 years, that's 5 doublings: $10,000 becomes $320,000. A bond portfolio at 5% doubles every 14.4 years — only 2.5 doublings in the same period: $10,000 becomes about $56,000.

**Understanding debt:** The Rule of 72 also applies to debt. Credit card debt at 24% interest doubles in just 3 years if you make no payments. A $5,000 balance becomes $10,000 in 3 years, then $20,000 in 6 years.

**Planning milestones:** If you invest $50,000 at 8%:
- In 9 years: $100,000
- In 18 years: $200,000
- In 27 years: $400,000
- In 36 years: $800,000

## Why 72?

The number 72 is used because it's a convenient approximation that's divisible by many common numbers (2, 3, 4, 6, 8, 9, 12). The mathematically precise value would be closer to 69.3 (using the natural logarithm of 2), but 72 is much easier for mental math and produces more accurate results for typical interest rates.

Try our Investment Calculator to see exact doubling times and growth projections for any interest rate and investment amount.
    `,
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug);
}
