-- CreateTable
CREATE TABLE "Furnaces" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "ip_adress" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "max_temperature" TEXT NOT NULL,
    "online" BOOLEAN NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Furnaces_ip_adress_key" ON "Furnaces"("ip_adress");
